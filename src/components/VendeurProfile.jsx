import React, { useState } from 'react'
import { Search, X, Home, Users, Grid, PlusCircle, Upload, Layers, ShoppingCart } from 'lucide-react'

import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import Label from "./ui/Label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card"
import Badge from "./ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/Tabs"

// Sample data
const categories = [
  { id: 1, name: "Sewing Tools", image: "https://i.pinimg.com/enabled_hi/564x/85/54/d6/8554d6137f68c28197cdd273ba940623.jpg", unit: "piece" },
  { id: 2, name: "Fabrics", image: "https://i.pinimg.com/enabled_hi/564x/85/54/d6/8554d6137f68c28197cdd273ba940623.jpg", unit: "meter" },
  { id: 3, name: "Notions", image: "https://i.pinimg.com/enabled_hi/564x/85/54/d6/8554d6137f68c28197cdd273ba940623.jpg", unit: "box" },
  { id: 4, name: "Machines", image: "https://i.pinimg.com/enabled_hi/564x/85/54/d6/8554d6137f68c28197cdd273ba940623.jpg", unit: "piece" },
]

const products = [
  { id: 1, name: "Professional Scissors", category: 1, price: 29.99, image: "/placeholder.svg?height=150&width=250" },
  { id: 2, name: "Cotton Fabric Bundle", category: 2, price: 24.99, image: "/placeholder.svg?height=150&width=250" },
  { id: 3, name: "Assorted Buttons Pack", category: 3, price: 9.99, image: "/placeholder.svg?height=150&width=250" },
  { id: 4, name: "Portable Sewing Machine", category: 4, price: 149.99, image: "/placeholder.svg?height=150&width=250" },
  { id: 5, name: "Seam Ripper Set", category: 1, price: 7.99, image: "/placeholder.svg?height=150&width=250" },
  { id: 6, name: "Silk Fabric Roll", category: 2, price: 39.99, image: "/placeholder.svg?height=150&width=250" },
]

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("Articles")
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false)
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
  const [image, setImage] = useState(null)

  const filteredProducts = products.filter(product =>
    (selectedCategory ? product.category === selectedCategory : true) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-[#CC8C87]">Threadline</h2>
        </div>
        <nav className="mt-6">
          <Tabs defaultValue="Articles" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-1 space-y-1">
              {["Articles", "Sellers", "Categories"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex items-center justify-start px-6 py-3 w-full text-left"
                >
                  {tab === "Articles" && <Home className="mr-3 h-5 w-5" />}
                  {tab === "Sellers" && <Users className="mr-3 h-5 w-5" />}
                  {tab === "Categories" && <Grid className="mr-3 h-5 w-5" />}
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="px-6 py-4 space-y-2">
            <Button
              className="w-full justify-start text-gray-600 hover:text-[#CC8C87]"
              variant="ghost"
              onClick={() => setIsArticleModalOpen(true)}
            >
              <PlusCircle className="mr-3 h-5 w-5" />
              Add Article
            </Button>
            <Button
              className="w-full justify-start text-gray-600 hover:text-[#CC8C87]"
              variant="ghost"
              onClick={() => setIsCategoryModalOpen(true)}
            >
              <Layers className="mr-3 h-5 w-5" />
              Add Category
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-8">
          {/* Search bar */}
          <div className="relative mb-8">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 border-gray-300 rounded-full shadow-md"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            {searchTerm && (
              <Button
                variant="ghost"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {categories.map(category => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${
                  selectedCategory === category.id ? 'ring-2 ring-[#CC8C87]' : ''
                }`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className="relative h-32">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <CardTitle className="text-white text-xl font-semibold">{category.name}</CardTitle>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <Badge variant="secondary" className="absolute top-2 right-2 bg-white text-[#CC8C87]">
                    {categories.find(c => c.id === product.category)?.name}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 text-gray-800">{product.name}</CardTitle>
                  <p className="font-bold text-2xl text-[#CC8C87]">${product.price.toFixed(2)}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-[#CC8C87] hover:bg-[#B87A75] text-white">
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Add Article Modal */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl flex">
            {/* Left side - Image upload */}
            <div className="w-1/2 p-8 border-r border-gray-200">
              <h2 className="text-3xl font-semibold text-[#CC8C87] mb-6">Add New Article</h2>
              <div className="space-y-4">
                <Label htmlFor="image" className="text-lg font-medium">Image</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#CC8C87] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {image ? (
                      <img src={image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-12 h-12 mb-4 text-[#CC8C87]" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                    )}
                    <input id="image" type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                  </label>
                </div>
              </div>
            </div>
            {/* Right side - Form fields */}
            <div className="w-1/2 p-8">
              <div className="flex justify-end">
                <Button variant="ghost" onClick={() => setIsArticleModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg font-medium">Name</Label>
                  <Input id="name" placeholder="Enter article name" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-lg font-medium">Category</Label>
                  <Select>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sewing-tools">Sewing Tools</SelectItem>
                      <SelectItem value="fabrics">Fabrics</SelectItem>
                      <SelectItem value="notions">Notions</SelectItem>
                      <SelectItem value="machines">Machines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity" className="text-lg font-medium">Stock Quantity</Label>
                    <Input id="stockQuantity" type="number" placeholder="0" min="0" className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unitPrice" className="text-lg font-medium">Unit Price</Label>
                    <Input id="unitPrice" type="number" placeholder="0.00" min="0" step="0.01" className="border-gray-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color" className="text-lg font-medium">Color</Label>
                  <Input id="color" placeholder="Enter color" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-lg font-medium">Tags</Label>
                  <Input id="tags" placeholder="Enter tags separated by commas" className="border-gray-300" />
                </div>
                <Button type="submit" className="w-full bg-[#CC8C87] hover:bg-[#B87A75] text-white text-lg py-3 transition-colors duration-200">
                  Add Article
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-semibold text-[#CC8C87]">Add New Category</h2>
              <Button variant="ghost" onClick={() => setIsCategoryModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <form className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="categoryName" className="text-lg font-medium">Name</Label>
                <Input id="categoryName" placeholder="Enter category name" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryUnit" className="text-lg font-medium">Unit</Label>
                <Input id="categoryUnit" placeholder="Enter unit (e.g., meter, box)" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryImage" className="text-lg font-medium">Image</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="categoryImage"
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-[#CC8C87] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-12 h-12 mb-4 text-[#CC8C87]" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="categoryImage" type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#CC8C87] hover:bg-[#B87A75] text-white text-lg py-3 transition-colors duration-200">
                Add Category
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}