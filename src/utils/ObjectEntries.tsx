// A typesafe object.entries
export const ObjectEntries = <T extends string, K>(object: Record<T, K> | null) => (object == null ? null : Object.entries(object) as [T, K][]);
export const ObjectValues = <T extends string, K>(object: Record<T, K> | null) => (object == null ? null : Object.values(object) as K[]);
