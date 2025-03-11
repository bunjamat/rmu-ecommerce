import ProductDetail from '@/components/product-detail';
import React from 'react'

const  ProductDetailPage = async ({params}) => {
    const { productId } = await params;

  return (
    <ProductDetail id={productId} />
  )
}

export default ProductDetailPage