import { defineConfig } from 'father';
import { Service } from 'father/dist/service/service';
import fs from 'fs-extra';
import path from 'path';
import { mergeConfig } from 'vite';
const ignores = ['src/vite-env.d.ts', 'src/demo/**', 'src/assets/**', 'src/main.tsx', 'src/App.tsx'];
const resolve = (...paths) => path.resolve(process.cwd(), ...paths);
const cssInJs = conf => {
  const config = defineConfig(mergeConfig({
    esm: {
      ignores,
      output: '/lib/esm'
    },
    cjs: {
      ignores,
      output: '/lib/cjs'
    }
  }, conf || {}));
  let env;
  return {
    name: 'build',
    apply(_, _env) {
      env = _env;
      return true;
    },
    async buildStart() {
      if (env.command !== 'build') {
        return;
      }
      const service = new Service();
      const _resolveConfig = service.resolveConfig.bind(service);
      service.resolveConfig = async function () {
        const data = await _resolveConfig();
        this.config = config;
        return {
          ...data,
          config: {
            ...data.defaultConfig,
            ...config
          }
        };
      };
      await service.run({
        name: 'build'
      });
      if (fs.existsSync(resolve('public'))) {
        fs.copySync(resolve('public'), resolve('lib'));
      }
      if (fs.existsSync(resolve('src/index.less'))) {
        fs.copyFileSync(resolve('src/index.less'), resolve('lib/index.less'));
      }
      fs.copyFileSync(resolve('package.json'), resolve('lib/package.json'));
      console.log = () => {};
      console.warn = () => {};
    },
    config() {
      return {
        build: {
          emptyOutDir: false,
          rollupOptions: {
            output: {
              dir: resolve('node_modules/.temp/dist')
            }
          },
          lib: {
            entry: 'src/vite-env.d.ts',
            name: 'noop',
            formats: []
          }
        }
      };
    }
  };
};
export default cssInJs;