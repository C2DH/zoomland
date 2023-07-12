// import { useGLTF } from '@react-three/drei'
// import { useEffect } from 'react'
// import { create } from 'zustand'

// export const useSharedAnimationStore = create((set) => ({
//   skin: {
//     animations: [],
//     primitives: [],
//     skeleton: null,
//     geometry: null,
//   },
//   setSkin: (skin) => set({ skin }),
// }))

// useGLTF.preload('../assets/models/Editor.glb')

// export const AnimationStoreLoader = () => {
//   const { nodes, animations } = useGLTF('../assets/models/Editor.glb')
//   const setSkin = useSharedAnimationStore((state) => state.setSkin)
//   useEffect(() => {
//     console.debug('[AnimationStoreLoader]', animations)
//     if (Array.isArray(animations) && animations.length) {
//       setSkin({
//         animations,
//         primitives: [
//           nodes.mixamorigHips,
//           nodes.Ctrl_Master,
//           nodes.Ctrl_ArmPole_IK_Left,

//           nodes.Ctrl_Hand_IK_Left,

//           nodes.Ctrl_ArmPole_IK_Right,

//           nodes.Ctrl_Hand_IK_Right,

//           nodes.Ctrl_Foot_IK_Left,

//           nodes.Ctrl_LegPole_IK_Left,

//           nodes.Ctrl_Foot_IK_Right,

//           nodes.Ctrl_LegPole_IK_Right,
//         ],
//         geometry: nodes.Object_5002.geometry,
//         skeleton: nodes.Object_5002.skeleton,
//       })
//     }
//   }, [nodes])
//   return null
// }
