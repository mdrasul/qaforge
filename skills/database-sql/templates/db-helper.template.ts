/**
 * db-helper.template.ts
 *
 * QAForge database-sql skill — Database Query Helper base pattern.
 *
 * HOW TO USE:
 *   1. Copy to your-project/tests/db/helpers/
 *   2. Replace [YOUR_DB_NAME] with your database/schema name
 *   3. Install your DB driver: npm install pg  (PostgreSQL)
 *                              npm install mysql2  (MySQL)
 *                              npm install mssql   (SQL Server)
 *   4. Set DB connection env vars in your CI secrets or .env (never commit credentials)
 *   5. Add one method per verification query from your SQL script
 *
 * SECURITY NOTE:
 *   - All connection details come from environment variables ONLY
 *   - All queries use parameterized inputs ($1, ?, @param) — never concatenate
 *   - This helper only runs SELECT queries — no mutations
 */

// ─── Example using PostgreSQL (pg) ────────────────────────────────────────
// Replace with your actual driver import
// import { Pool, PoolClient } from 'pg';

// ─── Connection config ────────────────────────────────────────────────────

interface DbConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl: boolean;
}

function getDbConfig(): DbConfig {
  return {
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    database: process.env.DB_NAME ?? '[YOUR_DB_NAME]',
    user: process.env.DB_USER ?? '',
    password: process.env.DB_PASSWORD ?? '',
    ssl: process.env.DB_SSL === 'true',
  };
}

// ─── Base helper class ────────────────────────────────────────────────────

export class DbHelper {
  // In a real implementation, initialize your pool here:
  // private pool: Pool;
  // constructor() { this.pool = new Pool(getDbConfig()); }

  /**
   * Example: query a single record by ID.
   * Replace with your actual table and column names from DB_CONTEXT.md.
   *
   * @param id - The record ID to look up (parameterized — never interpolated)
   * @returns The record if found, null if not
   */
  async getRecordById(id: string): Promise<Record<string, unknown> | null> {
    // Example parameterized query — adapt to your DB driver syntax
    // const result = await this.pool.query(
    //   'SELECT * FROM [schema].[table] WHERE id = $1',
    //   [id]
    // );
    // return result.rows[0] ?? null;

    // TODO: implement with your DB driver
    throw new Error('DbHelper.getRecordById: implement with your DB driver');
  }

  /**
   * Example: count rows matching a condition.
   * Use for ETL row count validation.
   */
  async countRows(table: string, whereClause: string, params: unknown[]): Promise<number> {
    // Example:
    // const result = await this.pool.query(
    //   `SELECT COUNT(*) as count FROM ${table} WHERE ${whereClause}`,
    //   params
    // );
    // return parseInt(result.rows[0].count, 10);

    // TODO: implement with your DB driver
    throw new Error('DbHelper.countRows: implement with your DB driver');
  }

  /**
   * Cleanup — close the connection pool after tests.
   * Call in afterAll() in your test file.
   */
  async close(): Promise<void> {
    // await this.pool.end();
  }
}
