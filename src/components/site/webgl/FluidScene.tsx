import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const TRAIL = 12;

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/* Lightweight liquid mesh-gradient: flowing fbm domain warp + cursor trail ripples */
const fragment = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec3 uTrail[${TRAIL}];   // xy = position (uv), z = strength
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;

  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(dot(hash(i), f), dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
      mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
          dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
      u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float aspect = uRes.x / max(uRes.y, 1.0);
    vec2 uv = vUv;
    vec2 p = vec2(uv.x * aspect, uv.y);

    // cursor-driven liquid distortion
    vec2 push = vec2(0.0);
    float ink = 0.0;
    for (int i = 0; i < ${TRAIL}; i++) {
      vec3 t = uTrail[i];
      if (t.z <= 0.001) continue;
      vec2 d = p - vec2(t.x * aspect, t.y);
      float dist = length(d);
      float fall = exp(-dist * 9.0) * t.z;
      push += normalize(d + 1e-5) * fall * 0.09;
      ink += fall;
    }

    float t = uTime * 0.05;
    vec2 warp = p + push;
    float n1 = fbm(warp * 2.1 + vec2(t, -t * 0.7));
    float n2 = fbm(warp * 3.4 - vec2(t * 0.8, t * 0.5) + n1);

    vec3 col = mix(uA, uB, smoothstep(-0.4, 0.6, n1 + uv.y * 0.4));
    col = mix(col, uC, smoothstep(0.0, 0.9, n2 + ink * 0.8));
    col += ink * 0.25;

    float alpha = clamp(0.30 + ink * 0.55 + n2 * 0.12, 0.0, 0.85);
    gl_FragColor = vec4(col, alpha);
  }
`;

function Plane() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const { viewport, size } = useThree();
  const pointer = useRef(new THREE.Vector2(0.5, 0.5));
  const trail = useRef(
    Array.from({ length: TRAIL }, () => new THREE.Vector3(0.5, 0.5, 0)),
  );

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uTrail: { value: Array.from({ length: TRAIL }, () => new THREE.Vector3(0.5, 0.5, 0)) },
      uA: { value: new THREE.Color("#ffd7bd") },
      uB: { value: new THREE.Color("#cfe0f2") },
      uC: { value: new THREE.Color("#ffb347") },
    }),
    [],
  );

  useFrame((state, delta) => {
    const m = mat.current;
    if (!m) return;
    const d = Math.min(delta, 0.05);
    const u = m.uniforms;
    u["uTime"]!.value += d;
    (u["uRes"]!.value as THREE.Vector2).set(size.width, size.height);

    // state.pointer is -1..1; convert to 0..1 uv
    pointer.current.lerp(
      new THREE.Vector2(state.pointer.x * 0.5 + 0.5, state.pointer.y * 0.5 + 0.5),
      0.18,
    );

    // shift trail and inject the newest pointer sample
    const list = trail.current;
    for (let i = list.length - 1; i > 0; i--) {
      const prev = list[i - 1]!;
      const cur = list[i]!;
      cur.set(prev.x, prev.y, prev.z * 0.88);
    }
    list[0]!.set(pointer.current.x, pointer.current.y, 1);
    const target = u["uTrail"]!.value as THREE.Vector3[];
    for (let i = 0; i < list.length; i++) target[i]!.copy(list[i]!);
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function FluidScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 1], fov: 50 }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Plane />
    </Canvas>
  );
}
