// * @react-pdf/renderer에서 사용하는 Image와 nextjs에서 사용하는 이미지 불러오기가 충돌이나서 
// * import example from"./public/image/example.png"를 사용할 수 없어 
// * next-images 라이브러리를 설치하여 가능하게 했습니다. 


const withImages = require('next-images')
module.exports = withImages({
  webpack(config, options) {
    return config
  }
})
