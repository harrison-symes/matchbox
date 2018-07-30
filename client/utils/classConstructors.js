export const warriorConstructor = (id, name, level = 1) => ({
  name,
  id,
  level,
  health: 5 + level,
  stamina: level + 1,
  power: level * 2,
  mana: 1,
  icon: 'ra-arena'
})


export default ({id, name, level, heroClass}) => {
  switch(heroClass) {
    default: return warriorConstructor(id, name, level)
  }
}
