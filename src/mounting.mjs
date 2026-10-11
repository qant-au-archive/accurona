// An element's mounting and facing (docs/scene-format.md, Mounting and
// facing): `mount` is cm from `mountFrom`, and `facing` says which way up the
// item is installed. All three are optional; absent they mean a floor
// reference and facing up.

export const MOUNT_FROM = ['floor', 'ceiling', 'surface'];
export const FACING = ['up', 'down'];

/** What is wrong with an element's mount, mountFrom and facing; empty when nothing is. */
export function mountingErrors(el) {
  const errors = [];
  if (el.mount != null && !(Number.isFinite(el.mount) && el.mount >= 0)) {
    errors.push(`mount ${JSON.stringify(el.mount)} is not a number of cm >= 0`);
  }
  if (el.mountFrom != null && !MOUNT_FROM.includes(el.mountFrom)) {
    errors.push(`mountFrom ${JSON.stringify(el.mountFrom)} is not one of ${MOUNT_FROM.join(', ')}`);
  }
  if (el.facing != null && !FACING.includes(el.facing)) {
    errors.push(`facing ${JSON.stringify(el.facing)} is not one of ${FACING.join(', ')}`);
  }
  return errors;
}
