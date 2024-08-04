import UnoCSS from 'unocss/vite'
/** vite配置在vitepress存在类型对不上, 暂时采用any解决 */
const config: any = {
  plugins: [
    UnoCSS(),
  ],

}
export default config
