#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var fs_1 = require("fs");
var path_1 = require("path");
var process_1 = require("process");
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var projectName, targetDir, templateDir, envExample, gitignore;
    return __generator(this, function (_a) {
        try {
            projectName = process.argv[2];
            if (!projectName) {
                console.error('Please provide a project name');
                console.error('Usage: npx @0xandreja/nextjs-ts-starter <project-name>');
                process.exit(1);
            }
            targetDir = (0, path_1.join)((0, process_1.cwd)(), projectName);
            if ((0, fs_1.existsSync)(targetDir)) {
                console.error("Directory ".concat(projectName, " already exists"));
                process.exit(1);
            }
            console.log("Creating new Next.js project in ".concat(targetDir, "..."));
            (0, fs_1.mkdirSync)(targetDir);
            templateDir = (0, path_1.join)(__dirname, '..', '..', 'templates');
            console.log("Looking for templates in: ".concat(templateDir));
            if (!(0, fs_1.existsSync)(templateDir)) {
                console.error("Template directory not found at ".concat(templateDir));
                process.exit(1);
            }
            // List contents of template directory
            console.log('Template directory contents:');
            (0, child_process_1.execSync)("ls -la \"".concat(templateDir, "\""), { stdio: 'inherit' });
            // Copy files
            console.log('Copying template files...');
            (0, child_process_1.execSync)("cp -r \"".concat(templateDir, "/\"* \"").concat(targetDir, "\""), { stdio: 'inherit' });
            // Create .env.example
            console.log('Creating .env.example...');
            envExample = "# Privy\nNEXT_PUBLIC_PRIVY_APP_ID=\"PIVY APP ID\"\nNEXT_PUBLIC_PRIVY_CLIENT_ID=\"PRIVY APP SECRET\"\n";
            (0, fs_1.writeFileSync)((0, path_1.join)(targetDir, '.env.example'), envExample);
            // Create .gitignore
            console.log('Creating .gitignore...');
            gitignore = "# dependencies\n/node_modules\n/.pnp\n.pnp.js\n\n# testing\n/coverage\n\n# next.js\n/.next/\n/out/\n\n# production\n/build\n\n# misc\n.DS_Store\n*.pem\n\n# debug\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n\n# local env files\n.env*.local\n.env\n\n# vercel\n.vercel\n\n# typescript\n*.tsbuildinfo\nnext-env.d.ts";
            (0, fs_1.writeFileSync)((0, path_1.join)(targetDir, '.gitignore'), gitignore);
            // Initialize git repository
            console.log('Initializing git repository...');
            (0, child_process_1.execSync)('git init', { cwd: targetDir, stdio: 'inherit' });
            // Install dependencies
            console.log('Installing dependencies (this may take a few minutes)...');
            try {
                (0, child_process_1.execSync)('npm install', {
                    cwd: targetDir,
                    stdio: 'inherit',
                    env: __assign(__assign({}, process.env), { FORCE_COLOR: '1' }),
                });
            }
            catch (error) {
                console.error('Error during npm install. You can try running npm install manually in the project directory.');
                console.error('Continuing with project creation...');
            }
            console.log("\n\uD83C\uDF89 Success! Created ".concat(projectName, " at ").concat(targetDir, "\n\n\uD83D\uDCE6 Package: https://www.npmjs.com/package/@0xandreja/nextjs-ts-starter\n\u2B50\uFE0F Star it on GitHub: https://github.com/0xandreja/nextjs-ts-starter\n\n\uD83D\uDE80 Getting Started:\n  cd ").concat(projectName, "\n  npm run dev\n\n\uD83D\uDCDA Available Scripts:\n  npm run dev     - Start development server\n  npm run build   - Build for production\n  npm start       - Start production server\n  npm run lint    - Run ESLint\n  npm run format  - Format code with Prettier\n\n\uD83D\uDD27 Configuration:\n  - Edit .env.example and rename to .env\n  - Configure Privy in the .env file\n  - Customize components in the components/ directory\n\n\uD83D\uDCA1 Need help? Open an issue on GitHub!\n    "));
        }
        catch (error) {
            console.error('Error:', error);
            process.exit(1);
        }
        return [2 /*return*/];
    });
}); };
main();
