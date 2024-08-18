import UnoCSS from 'unocss/vite'
import type { UserConfig } from 'vite'
/** vite配置在vitepress存在类型对不上, 暂时采用any解决 */
const config: UserConfig = {
  plugins: [
    UnoCSS(),
  ],

}
export default config
