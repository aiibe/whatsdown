export function splitSqlStatements(sql: string): string[] {
  return sql
    .split(/;\s*$/gm)
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);
}
