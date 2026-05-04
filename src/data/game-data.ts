export interface ApexLegend {
  name: string
  realName: string
  class: 'assault' | 'skirmisher' | 'recon' | 'controller' | 'support'
  difficulty: 1 | 2 | 3
  icon: string
  color: string
  image: string
  banner: string
  abilities: { name: string; type: 'passive' | 'tactical' | 'ultimate'; desc: string }[]
  description: string
}

export interface ApexWeapon {
  name: string
  type: 'AR' | 'SMG' | 'LMG' | 'sniper' | 'marksman' | 'shotgun' | 'pistol'
  ammo: 'light' | 'heavy' | 'energy' | 'sniper' | 'shotgun'
  tier: 'S' | 'A' | 'B' | 'C' | 'D'
  icon: string
  desc: string
}

const EA_CDN = 'https://media.contentapi.ea.com/content/dam/apex-legends'
const LEGEND_WALLPAPER = `${EA_CDN}/images/2019/01/legends-concept-art/apex-concept-art-wallpaper`
const LEGEND_BANNER = `${EA_CDN}/common/legends/apex-section-bg-legends`

function legendImg(name: string) { return `${LEGEND_WALLPAPER}-${name}.jpg.adapt.crop16x9.1920w.jpg` }
function bannerImg(name: string) { return `${LEGEND_BANNER}-${name}-xl.jpg.adapt.1920w.jpg` }

// Official hero key art (group shot) — used as hero section background
export const HERO_KEY_ART = `${EA_CDN}/common/apex-hero-medium-keyart-left-7x2-xl.jpg.adapt.crop7x2.1920w.jpg`

// Alternative key art crops for visual variety
export const HERO_KEY_ART_WIDE = `${EA_CDN}/common/apex-hero-large-keyart-16x9-xl.jpg.adapt.crop16x9.1920w.jpg`

// Texture backgrounds from official site
export const TEXTURE_BG = `${EA_CDN}/common/apex-section-bg-beige-texture-xl.jpg.adapt.1920w.jpg`
export const RED_GRIT_BG = `${EA_CDN}/common/apex-section-bg-red-grit-texture-xl.jpg.adapt.1920w.jpg`
export const DARK_BG = `${EA_CDN}/common/apex-section-bg-dark-texture-xl.jpg.adapt.1920w.jpg`

// Legend grid tile images (portrait squares, good for compact displays)
export function legendTile(name: string) {
  return `${EA_CDN}/common/legends/apex-grid-tile-legends-${name}.png.adapt.crop16x9.png`
}

// Map images from Fandom wiki CDN (community-maintained loading screens)
export const MAP_IMAGES = {
  kingsCanyon: 'https://static.wikia.nocookie.net/apexlegends/images/8/8c/Kings_Canyon_MU4.png',
  worldsEdge: 'https://static.wikia.nocookie.net/apexlegends/images/7/7e/World%27s_Edge_MU3.png',
  olympus: 'https://static.wikia.nocookie.net/apexlegends/images/2/2f/Olympus_MU1.png',
  stormPoint: 'https://static.wikia.nocookie.net/apexlegends/images/d/d7/Storm_Point.png',
  brokenMoon: 'https://static.wikia.nocookie.net/apexlegends/images/9/9b/Broken_Moon.png',
}

export interface ApexMap {
  name: string
  nameCN: string
  image: string
  size: 'small' | 'medium' | 'large' | 'xlarge'
  desc: string
  tips: string
}

export const apexMaps: ApexMap[] = [
  { name: 'Kings Canyon', nameCN: '诸王峡谷', image: MAP_IMAGES.kingsCanyon, size: 'medium', desc: 'APEX最初的战场，密集的工业建筑和峡谷地形', tips: '注意高处，屋顶老六最多' },
  { name: "World's Edge", nameCN: '世界边缘', image: MAP_IMAGES.worldsEdge, size: 'large', desc: '熔岩与冰雪交织，缆车系统提供垂直机动', tips: '利用缆车快速转移，熔岩裂缝即死' },
  { name: 'Olympus', nameCN: '奥林匹斯', image: MAP_IMAGES.olympus, size: 'large', desc: '悬浮云端的未来都市，开阔视野和长距离交火', tips: '相位传送门可用于快速逃生，注意地图边缘' },
  { name: 'Storm Point', nameCN: '风暴点', image: MAP_IMAGES.stormPoint, size: 'xlarge', desc: '热带海岛，丛林密布，重力大炮快速移动', tips: '重力大炮飞行中可改变方向' },
  { name: 'Broken Moon', nameCN: '残月', image: MAP_IMAGES.brokenMoon, size: 'medium', desc: '月球殖民地，滑索网络连接各个区域', tips: '滑索是双刃剑，滑太快会撞进敌阵' },
]

export const legends: ApexLegend[] = [
  {
    name: '恶灵',
    realName: 'Wraith',
    class: 'skirmisher',
    difficulty: 2,
    icon: '🌀',
    color: '#9B59B6',
    image: legendImg('wraith'),
    banner: bannerImg('wraith'),
    description: '跨维度散兵，能在战场上听到虚空中的声音。相位移动让她暂时遁入虚空躲避所有伤害。',
    abilities: [
      { name: '虚空之声', type: 'passive', desc: '危险临近时听到虚空中的声音警告' },
      { name: '踏入虚空', type: 'tactical', desc: '遁入虚空空间4秒，无法被伤害也无法造成伤害' },
      { name: '维度裂隙', type: 'ultimate', desc: '创建两个位置之间的传送门，持续60秒' }
    ]
  },
  {
    name: '探路者',
    realName: 'Pathfinder',
    class: 'skirmisher',
    difficulty: 1,
    icon: '🤖',
    color: '#3498DB',
    image: legendImg('pathfinder'),
    banner: bannerImg('pathfinder'),
    description: '乐观的前进侦察兵，用钩爪和滑索立体机动。精通立体作战，永远在寻找他的创造者。',
    abilities: [
      { name: '内部情报', type: 'passive', desc: '扫描侦查信标揭示下一个安全区位置' },
      { name: '钩爪', type: 'tactical', desc: '发射钩爪快速移动到目标点或敌人身边' },
      { name: '滑索枪', type: 'ultimate', desc: '创建一条所有人都能使用的滑索' }
    ]
  },
  {
    name: '寻血猎犬',
    realName: 'Bloodhound',
    class: 'recon',
    difficulty: 1,
    icon: '🦅',
    color: '#E74C3C',
    image: legendImg('bloodhound'),
    banner: bannerImg('bloodhound'),
    description: '科技追踪者，用扫描揭示敌人的行踪。信奉万物之父和全灵之母。',
    abilities: [
      { name: '追踪者', type: 'passive', desc: '看到敌人留下的足迹和线索' },
      { name: '全视之眼', type: 'tactical', desc: '短暂扫描前方锥形区域，显示敌人、陷阱和线索' },
      { name: '狩猎野兽', type: 'ultimate', desc: '进入狩猎状态，移动加速，视野变为热成像' }
    ]
  },
  {
    name: '生命线',
    realName: 'Lifeline',
    class: 'support',
    difficulty: 1,
    icon: '💉',
    color: '#2ECC71',
    image: legendImg('lifeline'),
    banner: bannerImg('lifeline'),
    description: '战斗医疗兵，在前线救死扶伤。她的无人机和复活护盾是团队的定心丸。',
    abilities: [
      { name: '战斗复活', type: 'passive', desc: '部署无人机复活队友，自己可以继续战斗' },
      { name: 'D.O.C治疗无人机', type: 'tactical', desc: '部署无人机治疗附近所有队友' },
      { name: '医疗补给舱', type: 'ultimate', desc: '呼叫一个装满高级防御装备的补给舱' }
    ]
  },
  {
    name: '直布罗陀',
    realName: 'Gibraltar',
    class: 'controller',
    difficulty: 1,
    icon: '🛡️',
    color: '#E67E22',
    image: legendImg('gibraltar'),
    banner: bannerImg('gibraltar'),
    description: '温柔巨人，用穹顶护盾保护队友。别被他的体型吓到，他是最可靠的防线。',
    abilities: [
      { name: '枪盾', type: 'passive', desc: '瞄准时展开枪盾吸收前方伤害' },
      { name: '穹顶护盾', type: 'tactical', desc: '投掷一个群体护盾，阻挡所有攻击18秒' },
      { name: '防御轰炸', type: 'ultimate', desc: '呼叫密集的迫击炮轰炸标记位置' }
    ]
  },
  {
    name: '动力小子',
    realName: 'Octane',
    class: 'skirmisher',
    difficulty: 1,
    icon: '⚡',
    color: '#1ABC9C',
    image: legendImg('octane'),
    banner: bannerImg('octane'),
    description: '极速肾上腺素瘾君子，用速度换取生命值。他跑得比子弹还快——差点。',
    abilities: [
      { name: '快速修复', type: 'passive', desc: '未受伤害时自动恢复生命值' },
      { name: '兴奋剂', type: 'tactical', desc: '牺牲生命值换取6秒移动加速' },
      { name: '发射台', type: 'ultimate', desc: '部署一个弹射跳板，把任何人弹向空中' }
    ]
  }
]

export const weapons: ApexWeapon[] = [
  { name: 'R-99冲锋枪', type: 'SMG', ammo: 'light', tier: 'S', icon: '🔫', desc: '极高射速，近战之王' },
  { name: 'C.A.R.冲锋枪', type: 'SMG', ammo: 'light', tier: 'S', icon: '🔫', desc: '双弹匣兼容，腰射精准' },
  { name: 'R-301卡宾枪', type: 'AR', ammo: 'light', tier: 'S', icon: '🎯', desc: '弹道最稳，新手首选' },
  { name: '平行步枪', type: 'AR', ammo: 'heavy', tier: 'A', icon: '🎯', desc: '伤害均衡，全能步枪' },
  { name: '敖犬霰弹枪', type: 'shotgun', ammo: 'shotgun', tier: 'A', icon: '💥', desc: '近战爆发力最强' },
  { name: '和平捍卫者', type: 'shotgun', ammo: 'shotgun', tier: 'A', icon: '💥', desc: '精准蓄力，一击入魂' },
  { name: '电能冲锋枪', type: 'SMG', ammo: 'energy', tier: 'A', icon: '⚡', desc: '能量弹道更易跟枪' },
  { name: '长弓DMR', type: 'sniper', ammo: 'sniper', tier: 'B', icon: '🔭', desc: '中远poke利器' },
  { name: '哨兵狙击枪', type: 'sniper', ammo: 'sniper', tier: 'B', icon: '🔭', desc: '可用护甲电池充能增伤' },
  { name: '猎人步枪', type: 'marksman', ammo: 'heavy', tier: 'B', icon: '🏹', desc: '腰射精准度高' },
  { name: 'EVA-8霰弹枪', type: 'shotgun', ammo: 'shotgun', tier: 'C', icon: '💥', desc: '全自动霰弹枪' },
  { name: '充能步枪', type: 'sniper', ammo: 'sniper', tier: 'C', icon: '🔭', desc: '命中即满伤害，无弹道下坠' }
]

export const tierColors: Record<string, string> = {
  S: '#FF5E1A',
  A: '#FFA500',
  B: '#FFD700',
  C: '#888',
  D: '#555'
}
