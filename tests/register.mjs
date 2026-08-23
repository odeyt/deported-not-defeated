import { registerHooks } from "node:module";
import { resolve } from "./ts-resolver.mjs";

/**
 * Loaded via `node --import ./tests/register.mjs`. See ts-resolver.mjs for
 * what the hook does and why it is needed.
 */
registerHooks({ resolve });
