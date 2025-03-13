## @hanyk/vite-plugin-build


> 使用 father build 

### 安装

```sh
npm i @hanyk/vite-plugin-build
or
yarn add @hanyk/vite-plugin-build
```

### API

```ts | pure
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import build from '@hanyk/vite-plugin-build'

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
