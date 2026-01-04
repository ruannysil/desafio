import {  afterEach, vi } from 'vitest';
import config from "dotenv";

config.config({path: '.env.test'});

process.env.JWT_SECRET;

global.console.error = () => {};
global.console.warn = () => {};

afterEach(() => {
  vi.clearAllMocks();
});