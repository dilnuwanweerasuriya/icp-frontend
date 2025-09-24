import './App.css'
import ProductCard from './components/ProductCard';

function App() {

  return (
    <>
      <ProductCard name="iPhone 17" price="535,000" image="https://www.att.com/scmsassets/global/devices/phones/apple/apple-iphone-17-pro-max/defaultimage/cosmic-orange-hero-zoom.png" />
      <ProductCard name="iPad" price="235,000" image="https://s3.ap-southeast-1.amazonaws.com/dlg.dialog.lk/s3fs-public/styles/product_large/public/2023-08/ipad-air-4-gen.jpg" />
      <ProductCard name="iWatch" price="120,000" image="https://i0.wp.com/chinthanagsm.lk/wp-content/uploads/2022/08/i-watch-series-7.jpg?fit=1000%2C1000&ssl=1" />
    </>
  )
}

export default App
