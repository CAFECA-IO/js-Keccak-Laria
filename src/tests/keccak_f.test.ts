import f from '../lib/keccak_f';

// check f function output
test('Check f function output', () => {
  let state = [];
  for (let i = 0; i < 50; ++i) {
    state[i] = 0;
  }

  expect(f(state)).toStrictEqual([
    1088544231, -249196679, 868239242, -2066363143, -1504007698, -711449058, 1870678349,
    -1122678992, 1649659991, -1960292859, 2140041172, -6839251, -1538897980, -1862343264,
    -702992778, -1940137460, 454624668, -1389320457, -795870108, 814963383, 588764725, -346379969,
    225517827, -1448679898, -607169185, -2119861226, 55035942, 1136144845, 296048287, 32648986,
    567914081, 98919258, -1932955406, 1690238706, 2076468753, 1630957717, 1339035339, -1199809963,
    483341000, -1942034294, -1371920876, -1811121886, -1564145180, 406976804, -419142206, 385168678,
    2133893435, 1979073769, 1559011913, -353239173,
  ]);
});
