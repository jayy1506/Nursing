import * as THREE from 'three';
import { createAnatomicalHeart } from './AnatomicalHeartModel';

/**
 * Creates true 3D organ specimens for the Three.js WebGL Stage.
 * Combines 3D anatomical volume geometries, vascular structures,
 * and high-resolution alpha-extracted photographic specimen textures with depth.
 */
export function buildOrgan3D(organId, meshesMap = {}, clippingPlanes = []) {
  const organRoot = new THREE.Group();
  organRoot.name = `organ_${organId}`;

  // Texture loader for alpha-extracted specimen cutout
  const textureLoader = new THREE.TextureLoader();
  const modelTexturePath = `/images/explorer/${organId}_model.png`;
  const texture = textureLoader.load(modelTexturePath);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  // Material with local clipping for cross-section and alpha transparency
  const texturedMat = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.05,
    roughness: 0.35,
    metalness: 0.08,
    side: THREE.DoubleSide,
    clippingPlanes: clippingPlanes,
    clipShadows: true
  });

  // Base 3D specimen curved plane with depth displacement
  const width = 2.4;
  const height = 2.4;
  const planeGeo = new THREE.PlaneGeometry(width, height, 32, 32);

  // Give the plane subtle organic curvature / depth
  const pos = planeGeo.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const dist = Math.sqrt(v.x * v.x + v.y * v.y);
    v.z = Math.cos(dist * 1.5) * 0.18; // Organic convex bulge
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  planeGeo.computeVertexNormals();

  const texturedMesh = new THREE.Mesh(planeGeo, texturedMat);
  texturedMesh.name = `${organId}_textured_specimen`;
  texturedMesh.castShadow = true;
  texturedMesh.receiveShadow = true;
  meshesMap['specimen_plate'] = texturedMesh;
  organRoot.add(texturedMesh);

  // Depth backplate with slight offset for true 3D parallax
  const backMat = texturedMat.clone();
  backMat.opacity = 0.85;
  const backMesh = new THREE.Mesh(planeGeo, backMat);
  backMesh.position.z = -0.08;
  backMesh.scale.set(0.97, 0.97, 0.97);
  organRoot.add(backMesh);

  // Specimen-specific 3D structural enhancements
  if (organId === 'heart') {
    // Also include anatomical 3D heart components in the group
    const anatomicalHeart = createAnatomicalHeart(meshesMap);
    anatomicalHeart.scale.set(0.72, 0.72, 0.72);
    anatomicalHeart.position.set(0, 0, -0.05);
    // Hide default procedural mesh slightly behind the primary plate or blend them
    organRoot.add(anatomicalHeart);
  } else if (organId === 'liver') {
    // 3D Hepatic vessels (portal vein and hepatic artery)
    const vesselGroup = new THREE.Group();
    vesselGroup.name = 'liver_vessels';

    const pvMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.3,
      clippingPlanes: clippingPlanes
    });
    const pvGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.8, 16);
    const pvMesh = new THREE.Mesh(pvGeo, pvMat);
    pvMesh.position.set(0.05, -0.4, 0.05);
    vesselGroup.add(pvMesh);

    const haMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.3,
      clippingPlanes: clippingPlanes
    });
    const haGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.6, 16);
    const haMesh = new THREE.Mesh(haGeo, haMat);
    haMesh.position.set(-0.08, -0.35, 0.08);
    vesselGroup.add(haMesh);

    meshesMap['vascular'] = vesselGroup;
    organRoot.add(vesselGroup);
  } else if (organId === 'kidneys') {
    // 3D Renal arteries and bilateral ureters
    const renalGroup = new THREE.Group();
    renalGroup.name = 'renal_conduits';

    const raMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.3,
      clippingPlanes: clippingPlanes
    });
    const rvMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      roughness: 0.3,
      clippingPlanes: clippingPlanes
    });
    const ureterMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.4,
      clippingPlanes: clippingPlanes
    });

    // Central aortic conduit
    const aortaGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.9, 16);
    const aortaMesh = new THREE.Mesh(aortaGeo, raMat);
    aortaMesh.position.set(0, 0, -0.05);
    renalGroup.add(aortaMesh);

    // Left & Right Ureters descending
    const uGeo = new THREE.CylinderGeometry(0.035, 0.03, 0.8, 12);
    const lu = new THREE.Mesh(uGeo, ureterMat);
    lu.position.set(-0.25, -0.65, 0.02);
    const ru = new THREE.Mesh(uGeo, ureterMat);
    ru.position.set(0.25, -0.65, 0.02);
    renalGroup.add(lu);
    renalGroup.add(ru);

    meshesMap['vascular'] = renalGroup;
    organRoot.add(renalGroup);
  } else if (organId === 'eye') {
    // 3D Cornea and Optic Nerve
    const eyeGroup = new THREE.Group();
    const scleraMat = new THREE.MeshStandardMaterial({
      color: 0xfaf5ee,
      roughness: 0.2,
      clippingPlanes: clippingPlanes
    });
    const sphereGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const sphereMesh = new THREE.Mesh(sphereGeo, scleraMat);
    sphereMesh.position.set(0, 0, -0.15);
    sphereMesh.scale.set(0.9, 0.9, 0.6);
    eyeGroup.add(sphereMesh);

    const onMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.4,
      clippingPlanes: clippingPlanes
    });
    const onGeo = new THREE.CylinderGeometry(0.08, 0.09, 0.6, 16);
    const onMesh = new THREE.Mesh(onGeo, onMat);
    onMesh.rotation.x = Math.PI / 2;
    onMesh.position.set(0, 0, -0.75);
    eyeGroup.add(onMesh);

    meshesMap['eye_core'] = eyeGroup;
    organRoot.add(eyeGroup);
  } else if (organId === 'brain') {
    // Brainstem & cerebellar peduncles
    const bsMat = new THREE.MeshStandardMaterial({
      color: 0xdeb887,
      roughness: 0.5,
      clippingPlanes: clippingPlanes
    });
    const bsGeo = new THREE.CylinderGeometry(0.12, 0.09, 0.6, 16);
    const bsMesh = new THREE.Mesh(bsGeo, bsMat);
    bsMesh.position.set(0.05, -0.55, -0.05);
    organRoot.add(bsMesh);
  } else if (organId === 'lungs') {
    // Trachea with cartilage rings
    const tracheaMat = new THREE.MeshStandardMaterial({
      color: 0x5a7d9a,
      roughness: 0.4,
      clippingPlanes: clippingPlanes
    });
    const tGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.7, 16);
    const tMesh = new THREE.Mesh(tGeo, tracheaMat);
    tMesh.position.set(0.05, 0.6, -0.02);
    organRoot.add(tMesh);
  }

  return organRoot;
}
