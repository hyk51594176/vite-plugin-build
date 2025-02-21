## @dg/vite-plugin-build


> 使用 father build 

### 安装

```sh
npm i @dg/vite-plugin-build
or
yarn add @dg/vite-plugin-build
```

### API

```ts | pure
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import build from '@dg/vite-plugin-build'

export default defineConfig({
  plugins: [
    react(),
    build({
      // father Config
      esm: {
        targets: {
          node: 20
        }
      },
      cjs: {
        targets: {
          node: 20
        }
      }
    })
  ]
})
```
