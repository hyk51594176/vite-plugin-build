var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);
var import_father = require("father");
var import_service = require("father/dist/service/service");
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
var import_vite = require("vite");
var ignores = [
  "src/vite-env.d.ts",
  "src/demo/**",
  "src/assets/**",
  "src/main.tsx",
  "src/App.tsx"
];
var resolve = (...paths) => import_path.default.resolve(process.cwd(), ...paths);
var cssInJs = (conf) => {
  const config = (0, import_father.defineConfig)(
    (0, import_vite.mergeConfig)(
      {
        esm: { ignores, output: "/lib/esm" },
        cjs: { ignores, output: "/lib/cjs" }
      },
      conf || {}
    )
  );
  let env;
  return {
    name: "build",
    apply(_, _env) {
      env = _env;
      return true;
    },
    async buildStart() {
      if (env.command !== "build") {
        return;
      }
      const service = new import_service.Service();
      const _resolveConfig = service.resolveConfig.bind(service);
      service.resolveConfig = async function() {
        const data = await _resolveConfig();
        this.config = config;
        return {
          ...data,
          config: { ...data.defaultConfig, ...config }
        };
      };
      await service.run({
        name: "build"
      });
      if (import_fs_extra.default.existsSync(resolve("public"))) {
        import_fs_extra.default.copySync(resolve("public"), resolve("lib"));
      }
      if (import_fs_extra.default.existsSync(resolve("src/index.less"))) {
        import_fs_extra.default.copyFileSync(resolve("src/index.less"), resolve("lib/index.less"));
      }
      import_fs_extra.default.copyFileSync(resolve("package.json"), resolve("lib/package.json"));
      console.log = () => {
      };
      console.warn = () => {
      };
    },
    config() {
      return {
        build: {
          emptyOutDir: false,
          rollupOptions: {
            output: {
              dir: resolve("node_modules/.temp/dist")
            }
          },
          lib: {
            entry: "src/vite-env.d.ts",
            name: "noop",
            formats: []
          }
        }
      };
    }
  };
};
var src_default = cssInJs;
