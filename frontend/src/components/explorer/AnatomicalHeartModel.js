import * as THREE from 'three';

/**
 * Builds a medically recognizable, anatomical 3D human heart model.
 * Includes:
 * - Left & Right Ventricles with realistic cardiac apex (Apex Cordis)
 * - Interventricular Sulcus with Coronary Arteries (LAD & RCA) & Cardiac Veins
 * - Ascending Aorta & Aortic Arch with 3 Great Branching Arteries
 * - Pulmonary Trunk & Left/Right Pulmonary Arterial Bifurcation
 * - Superior Vena Cava (SVC) and Inferior Vena Cava (IVC)
 * - Right Atrium & Left Auricle
 */
export function createAnatomicalHeart(meshesMap) {
  const heartGroup = new THREE.Group();
  heartGroup.name = 'anatomicalHeart';

  // 1. CARDIAC VENTRICLES & APEX (Myocardium)
  // Deform a sphere geometry to create the true asymmetrical conical pear shape of the heart
  const ventricleGeo = new THREE.SphereGeometry(0.78, 48, 48);
  const pos = ventricleGeo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);

    // Taper downwards to form the pointed apex at bottom-left
    if (v.y < 0) {
      const taper = 1.0 + v.y * 0.55; // Narrows towards apex
      v.x *= taper;
      v.z *= taper;
      v.x -= Math.abs(v.y) * 0.22; // Tilt apex toward anatomical left
      v.z += Math.abs(v.y) * 0.12; // Tilt apex slightly anteriorly
    }

    // Anterior interventricular groove indentation
    if (v.z > 0.3 && Math.abs(v.x + 0.05) < 0.25) {
      v.z -= 0.08 * (1.0 - Math.abs(v.x + 0.05) / 0.25);
    }

    // Bulge left ventricular lateral wall
    if (v.x < -0.2 && v.y > -0.4 && v.y < 0.3) {
      v.x *= 1.15;
    }

    pos.setXYZ(i, v.x, v.y, v.z);
  }

  ventricleGeo.computeVertexNormals();

  const lvMat = new THREE.MeshStandardMaterial({
    color: 0x9e2424, // Deep rich cardiac myocardium
    roughness: 0.35,
    metalness: 0.08,
    emissive: 0x4a0e0e,
    emissiveIntensity: 0.08
  });

  const lvMesh = new THREE.Mesh(ventricleGeo, lvMat);
  lvMesh.castShadow = true;
  lvMesh.receiveShadow = true;
  lvMesh.position.set(-0.08, -0.15, 0.05);
  lvMesh.userData = { id: 'left-ventricle', layerId: 'myocardium' };
  heartGroup.add(lvMesh);
  meshesMap['left-ventricle'] = lvMesh;

  // 2. RIGHT VENTRICLE (Anterior Crescent)
  const rvGeo = new THREE.SphereGeometry(0.55, 36, 36);
  rvGeo.scale(0.85, 1.05, 0.7);
  const rvMat = new THREE.MeshStandardMaterial({
    color: 0x8f2020,
    roughness: 0.38,
    metalness: 0.08,
    emissive: 0x3d0b0b,
    emissiveIntensity: 0.05
  });
  const rvMesh = new THREE.Mesh(rvGeo, rvMat);
  rvMesh.position.set(0.28, -0.05, 0.22);
  rvMesh.rotation.set(-0.15, 0.2, -0.2);
  rvMesh.userData = { id: 'left-ventricle', layerId: 'myocardium' };
  heartGroup.add(rvMesh);

  // 3. RIGHT ATRIUM & AURICLE (Receiving Chamber)
  const raGeo = new THREE.SphereGeometry(0.48, 36, 36);
  raGeo.scale(0.85, 1.1, 0.9);
  const raMat = new THREE.MeshStandardMaterial({
    color: 0x2255a4, // Venous blue chamber
    roughness: 0.32,
    metalness: 0.12,
    emissive: 0x0f2a5c,
    emissiveIntensity: 0.08
  });
  const raMesh = new THREE.Mesh(raGeo, raMat);
  raMesh.position.set(0.62, 0.28, 0.1);
  raMesh.userData = { id: 'right-atrium', layerId: 'myocardium' };
  heartGroup.add(raMesh);
  meshesMap['right-atrium'] = raMesh;

  // Left Auricle (Dog-ear flap peeking laterally)
  const auricleGeo = new THREE.ConeGeometry(0.24, 0.45, 24);
  auricleGeo.rotateZ(Math.PI / 3);
  const auricleMesh = new THREE.Mesh(auricleGeo, lvMat);
  auricleMesh.position.set(-0.62, 0.32, 0.12);
  auricleMesh.userData = { id: 'left-ventricle', layerId: 'myocardium' };
  heartGroup.add(auricleMesh);

  // 4. ASCENDING AORTA & AORTIC ARCH (Arcus Aortae)
  const aortaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.02, 0.25, 0.1),
    new THREE.Vector3(0.04, 0.65, 0.05),
    new THREE.Vector3(0.02, 0.95, -0.05),
    new THREE.Vector3(-0.18, 0.98, -0.2),
    new THREE.Vector3(-0.35, 0.68, -0.32),
    new THREE.Vector3(-0.38, 0.1, -0.35)
  ]);

  const aortaGeo = new THREE.TubeGeometry(aortaCurve, 40, 0.19, 24, false);
  const aortaMat = new THREE.MeshStandardMaterial({
    color: 0xd92d20, // Bright systemic arterial scarlet
    roughness: 0.28,
    metalness: 0.15,
    emissive: 0x6e1008,
    emissiveIntensity: 0.08
  });
  const aortaMesh = new THREE.Mesh(aortaGeo, aortaMat);
  aortaMesh.userData = { id: 'aortic-arch', layerId: 'vessels' };
  heartGroup.add(aortaMesh);
  meshesMap['aortic-arch'] = aortaMesh;

  // Three Great Branches of the Aortic Arch:
  // (a) Brachiocephalic Trunk
  const bctCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.02, 0.95, -0.06),
    new THREE.Vector3(0.12, 1.15, -0.04),
    new THREE.Vector3(0.18, 1.35, -0.02)
  ]);
  const bctMesh = new THREE.Mesh(
    new THREE.TubeGeometry(bctCurve, 16, 0.075, 16, false),
    aortaMat
  );
  bctMesh.userData = { id: 'aortic-arch', layerId: 'vessels' };
  heartGroup.add(bctMesh);

  // (b) Left Common Carotid Artery
  const lccCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.08, 0.98, -0.12),
    new THREE.Vector3(-0.06, 1.2, -0.12),
    new THREE.Vector3(-0.05, 1.38, -0.12)
  ]);
  const lccMesh = new THREE.Mesh(
    new THREE.TubeGeometry(lccCurve, 16, 0.06, 16, false),
    aortaMat
  );
  lccMesh.userData = { id: 'aortic-arch', layerId: 'vessels' };
  heartGroup.add(lccMesh);

  // (c) Left Subclavian Artery
  const lscCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.18, 0.95, -0.19),
    new THREE.Vector3(-0.22, 1.18, -0.19),
    new THREE.Vector3(-0.25, 1.36, -0.19)
  ]);
  const lscMesh = new THREE.Mesh(
    new THREE.TubeGeometry(lscCurve, 16, 0.06, 16, false),
    aortaMat
  );
  lscMesh.userData = { id: 'aortic-arch', layerId: 'vessels' };
  heartGroup.add(lscMesh);

  // 5. PULMONARY TRUNK & BIFURCATION (Truncus Pulmonalis)
  const ptCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.12, 0.28, 0.35),
    new THREE.Vector3(-0.02, 0.52, 0.28),
    new THREE.Vector3(-0.16, 0.72, 0.12)
  ]);
  const ptGeo = new THREE.TubeGeometry(ptCurve, 24, 0.18, 20, false);
  const ptMat = new THREE.MeshStandardMaterial({
    color: 0x1d68bd, // Distinct pulmonary artery blue
    roughness: 0.3,
    metalness: 0.12,
    emissive: 0x093163,
    emissiveIntensity: 0.08
  });
  const ptMesh = new THREE.Mesh(ptGeo, ptMat);
  ptMesh.userData = { id: 'pulmonary-trunk', layerId: 'vessels' };
  heartGroup.add(ptMesh);
  meshesMap['pulmonary-trunk'] = ptMesh;

  // Left Pulmonary Artery Branch
  const lpaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.16, 0.72, 0.12),
    new THREE.Vector3(-0.42, 0.76, -0.05),
    new THREE.Vector3(-0.68, 0.75, -0.18)
  ]);
  const lpaMesh = new THREE.Mesh(
    new THREE.TubeGeometry(lpaCurve, 18, 0.1, 16, false),
    ptMat
  );
  lpaMesh.userData = { id: 'pulmonary-trunk', layerId: 'vessels' };
  heartGroup.add(lpaMesh);

  // Right Pulmonary Artery Branch (runs under the aorta arch)
  const rpaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.16, 0.72, 0.12),
    new THREE.Vector3(0.12, 0.68, -0.08),
    new THREE.Vector3(0.58, 0.62, -0.16)
  ]);
  const rpaMesh = new THREE.Mesh(
    new THREE.TubeGeometry(rpaCurve, 18, 0.1, 16, false),
    ptMat
  );
  rpaMesh.userData = { id: 'pulmonary-trunk', layerId: 'vessels' };
  heartGroup.add(rpaMesh);

  // 6. SUPERIOR VENA CAVA (SVC) & INFERIOR VENA CAVA (IVC)
  const svcCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.48, 1.25, -0.05),
    new THREE.Vector3(0.48, 0.85, -0.02),
    new THREE.Vector3(0.52, 0.45, 0.04)
  ]);
  const svcMesh = new THREE.Mesh(
    new THREE.TubeGeometry(svcCurve, 20, 0.15, 20, false),
    raMat
  );
  svcMesh.userData = { id: 'right-atrium', layerId: 'vessels' };
  heartGroup.add(svcMesh);

  const ivcCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.5, 0.1, -0.08),
    new THREE.Vector3(0.48, -0.42, -0.12),
    new THREE.Vector3(0.46, -0.75, -0.15)
  ]);
  const ivcMesh = new THREE.Mesh(
    new THREE.TubeGeometry(ivcCurve, 16, 0.14, 16, false),
    raMat
  );
  ivcMesh.userData = { id: 'right-atrium', layerId: 'vessels' };
  heartGroup.add(ivcMesh);

  // 7. CORONARY SULCUS & VESSELS (LAD Artery + Great Cardiac Vein)
  // Left Anterior Descending (LAD) Artery (The "Widowmaker" branch running down interventricular sulcus to apex)
  const ladCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.06, 0.38, 0.42),
    new THREE.Vector3(-0.02, 0.15, 0.52),
    new THREE.Vector3(-0.08, -0.18, 0.48),
    new THREE.Vector3(-0.22, -0.48, 0.38),
    new THREE.Vector3(-0.35, -0.72, 0.26)
  ]);
  const coronaryMat = new THREE.MeshStandardMaterial({
    color: 0xef4444, // Bright arterial red
    roughness: 0.25,
    metalness: 0.15,
    emissive: 0x991b1b,
    emissiveIntensity: 0.2
  });
  const ladMesh = new THREE.Mesh(
    new THREE.TubeGeometry(ladCurve, 32, 0.028, 12, false),
    coronaryMat
  );
  ladMesh.userData = { id: 'left-ventricle', layerId: 'vessels' };
  heartGroup.add(ladMesh);

  // Great Cardiac Vein accompanying LAD
  const veinCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.03, 0.36, 0.41),
    new THREE.Vector3(0.01, 0.13, 0.51),
    new THREE.Vector3(-0.05, -0.2, 0.47),
    new THREE.Vector3(-0.19, -0.5, 0.36)
  ]);
  const cardiacVeinMat = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    roughness: 0.3,
    metalness: 0.1
  });
  const veinMesh = new THREE.Mesh(
    new THREE.TubeGeometry(veinCurve, 24, 0.022, 10, false),
    cardiacVeinMat
  );
  veinMesh.userData = { id: 'left-ventricle', layerId: 'vessels' };
  heartGroup.add(veinMesh);

  // Right Coronary Artery (RCA) curving in the atrioventricular sulcus
  const rcaCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.12, 0.32, 0.36),
    new THREE.Vector3(0.32, 0.22, 0.38),
    new THREE.Vector3(0.48, 0.05, 0.3),
    new THREE.Vector3(0.52, -0.18, 0.18)
  ]);
  const rcaMesh = new THREE.Mesh(
    new THREE.TubeGeometry(rcaCurve, 24, 0.026, 12, false),
    coronaryMat
  );
  rcaMesh.userData = { id: 'right-atrium', layerId: 'vessels' };
  heartGroup.add(rcaMesh);

  // 8. ATRIOVENTRICULAR VALVES (Internal ring)
  const valveGeo = new THREE.TorusGeometry(0.24, 0.035, 16, 32);
  valveGeo.rotateX(Math.PI / 2);
  const valveMat = new THREE.MeshStandardMaterial({
    color: 0xf2b66d, // Warm Amber for valves
    roughness: 0.25,
    metalness: 0.2,
    emissive: 0xb45309,
    emissiveIntensity: 0.15
  });
  const valveMesh = new THREE.Mesh(valveGeo, valveMat);
  valveMesh.position.set(-0.25, 0.05, 0.1);
  valveMesh.rotation.set(0.2, 0, 0.35);
  valveMesh.userData = { id: 'mitral-valve', layerId: 'valves' };
  heartGroup.add(valveMesh);
  meshesMap['mitral-valve'] = valveMesh;

  return heartGroup;
}
