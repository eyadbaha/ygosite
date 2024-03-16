import z from "zod";
const Attributes = ["SPELL", "TRAP", "FIRE", "WATER", "EARTH", "WIND", "LIGHT", "DARK", "DIVINE", "LAUGH"] as const;
const Types = [
  "Spell",
  "Trap",
  "Normal",
  "Effect",
  "Ritual",
  "Fusion",
  "Synchro",
  "Xyz",
  "Pendulum",
  "Link",
  "Token",
  "Tuner",
  "Special Summon",
  "Spirit",
  "Toon",
  "Union",
  "Gemini",
  "Flip",
  "Continuous",
  "Equip",
  "Quick-Play",
  "Field",
  "Counter",
  "Aqua",
  "Beast",
  "Beast-Warrior",
  "Creator God",
  "Cyberse",
  "Dinosaur",
  "Divine-Beast",
  "Dragon",
  "Fairy",
  "Fiend",
  "Fish",
  "Illusion",
  "Insect",
  "Machine",
  "Plant",
  "Psychic",
  "Pyro",
  "Reptile",
  "Rock",
  "Sea Serpent",
  "Spellcaster",
  "Thunder",
  "Warrior",
  "Winged Beast",
  "Wyrm",
  "Zombie",
  "Maximum",
  "Galaxy",
  "Celestial Warrior",
  "Cyborg",
  "High Dragon",
  "Magical Knight",
  "Omega Psychic",
] as const;
const AttributeSchema = z.enum(Attributes);
const TypeSchema = z.array(z.enum(Types)).refine((items) => new Set(items).size === items.length, {
  message: "Must be an array of unique attributes",
});

const BaseCardSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  desc: z.string(),
  attribute: AttributeSchema.optional(),
  types: TypeSchema,
  official: z.boolean().optional(),
  sets: z.array(z.object({ code: z.string(), rarity: z.string() })).optional(),
  arts: z.array(z.number()),
  format: z.enum(["TCG", "OCG", "MASTER", "RUSH", "SPEED"]).default("SPEED"),
});
const BaseMonsterCardSchema = BaseCardSchema.extend({
  atk: z.number().min(-1),
});
const NonLinkMonsterCardSchema = BaseMonsterCardSchema.extend({
  level: z.number().min(1).max(13),
  def: z.number().min(-1),
});
const PendulumMonsterCardSchema = NonLinkMonsterCardSchema.extend({
  scale: z.number().min(0).max(13),
  pend_desc: z.string().min(0).optional(),
});
const LinkMonsterCardSchema = BaseMonsterCardSchema.extend({
  level: z.number().min(1).max(8),
  linkmarkers: z.array(z.string()).min(1).max(8),
});
const MonsterCardSchema = LinkMonsterCardSchema.or(PendulumMonsterCardSchema).or(NonLinkMonsterCardSchema);
const OcgCardSchema = MonsterCardSchema.or(BaseCardSchema);
const RushBaseCardSchema = BaseCardSchema.extend({
  legend: z.boolean(),
});
const RushMonsterCardSchema = RushBaseCardSchema.extend({
  level: z.number().min(1).max(12),
  atk: z.number().min(-1),
  def: z.number().min(-1),
  maxAtk: z.number().min(-1).optional(),
});
const RushCardSchema = RushMonsterCardSchema.or(RushBaseCardSchema);
export const YugiohCardSchema = RushCardSchema.or(OcgCardSchema);
export type YugiohCardType = z.infer<typeof YugiohCardSchema>;
