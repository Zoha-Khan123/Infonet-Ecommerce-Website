import  {useEffect, useState} from 'react'
import client from "../../../sanityClient"

interface DataItem {
  id: number
  title: string
  image: string
  category: string
  description: string
  _type: string
  _id: string
}

export default function CreateData() {
  const [products, setProducts] = useState<DataItem[]>([])
    console.log(products);
    
  // data transfer to sanity studio function
  const createProducts = async () => {
    const res = await fetch('https://fakestoreapi.com/products')
    const data: DataItem[] = await res.json()
    console.log(data)

    // Wrap the map inside Promise.all to handle all async calls concurrently
    await Promise.all(
      data.map(async (item) => {
        // For image
        console.log(item)

        const res = await fetch(item.image)
        const blob = await res.blob()
        const asset = await client.assets.upload('image', blob)

        const sanityData = {
          ...item,
          image: {
            _type: 'image',
            asset: {
              _ref: asset._id,
              _type: 'reference',
            },
          },
          _id: item.id.toString(),
          _type: 'product',
        }

        await client.createOrReplace(sanityData)
      }),
    )

    console.log('Products created successfully')
  }

  const deleteData = async () => {
    const query = '*[_type == "product"]'
    const posts = await client.fetch(query)
    posts.map((pos: DataItem) => {
      client.delete(pos._id)
    })
    setProducts([]) // Clear the products list from the state
  }

  useEffect(() => {
    deleteData()
    createProducts()
  }, [])

  return <></>
}
