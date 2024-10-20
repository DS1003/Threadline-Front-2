import React, { useState } from 'react'
import { Search, X, Home, Users, Grid, PlusCircle, Upload, Layers } from 'lucide-react'

import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import Label from "./ui/Label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/Card"
import Badge from "./ui/Badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"

// Sample data
const categories = [
  { id: 1, name: "Sewing Tools", image: "/placeholder.svg?height=100&width=200", unit: "piece" },
  { id: 2, name: "Fabrics", image: "/placeholder.svg?height=100&width=200", unit: "meter" },
  { id: 3, name: "Notions", image: "/placeholder.svg?height=100&width=200", unit: "box" },
  { id: 4, name: "Machines", image: "/placeholder.svg?height=100&width=200", unit: "piece" },
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
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 shadow-lg">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-[#CC8C87]">Threadline</h2>
        </div>
        <nav className="mt-6">
          {["Articles", "Sellers", "Categories"].map((tab) => (
            <button
              key={tab}
              className={`flex items-center px-6 py-3 w-full text-left ${
                activeTab === tab ? "bg-[#CC8C87] text-white" : "text-gray-600 hover:bg-[#CC8C87] hover:text-white"
              } transition-all duration-200 ease-in-out`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "Articles" && <Home className="mr-3 h-5 w-5" />}
              {tab === "Sellers" && <Users className="mr-3 h-5 w-5" />}
              {tab === "Categories" && <Grid className="mr-3 h-5 w-5" />}
              {tab}
            </button>
          ))}
          <button
            className="flex items-center px-6 py-3 w-full text-left text-gray-600 hover:bg-[#CC8C87] hover:text-white transition-all duration-200 ease-in-out"
            onClick={() => setIsArticleModalOpen(true)}
          >
            <PlusCircle className="mr-3 h-5 w-5" />
            Add Article
          </button>
          <button
            className="flex items-center px-6 py-3 w-full text-left text-gray-600 hover:bg-[#CC8C87] hover:text-white transition-all duration-200 ease-in-out"
            onClick={() => setIsCategoryModalOpen(true)}
          >
            <Layers className="mr-3 h-5 w-5" />
            Add Category
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-4">
          {/* Search bar */}
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-10 border-gray-300"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categories.map(category => (
              <Card
                key={category.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${selectedCategory === category.id ? 'ring-2 ring-[#CC8C87]' : ''}`}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <CardHeader className="p-4">
                  <img src={category.image} alt={category.name} className="w-full h-24 object-cover rounded-md" />
                </CardHeader>
                <CardFooter className="p-4">
                  <CardTitle className="text-sm">{category.name}</CardTitle>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Products */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      {categories.find(c => c.id === product.category)?.name}
                    </Badge>
                    <span className="font-bold text-[#CC8C87]">${product.price.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full bg-[#CC8C87] hover:bg-[#B87A75] text-white">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Horizontal Add Article Modal */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl flex">
            {/* Left side - Image upload */}
            <div className="w-1/2 p-6 border-r border-gray-200">
              <h2 className="text-2xl font-semibold text-[#CC8C87] mb-4">Add New Article</h2>
              <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#CC8C87] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    {image ? (
                      <img src={image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-[#CC8C87]" />
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
            <div className="w-1/2 p-6">
              <div className="flex justify-end">
                <Button variant="ghost" onClick={() => setIsArticleModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter article name" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockQuantity">Stock Quantity</Label>
                    <Input id="stockQuantity" type="number" placeholder="0" min="0" className="border-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unitPrice">Unit Price</Label>
                    <Input id="unitPrice" type="number" placeholder="0.00" min="0" step="0.01" className="border-gray-300" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input id="color" placeholder="Enter color" className="border-gray-300" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input id="tags" placeholder="Enter tags separated by commas" className="border-gray-300" />
                </div>
                <Button type="submit" className="w-full bg-[#CC8C87] hover:bg-[#B87A75] text-white transition-colors duration-200">
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
            <form className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="categoryName">Name</Label>
                <Input id="categoryName" placeholder="Enter category name" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryUnit">Unit</Label>
                <Input id="categoryUnit" placeholder="Enter unit (e.g., meter, box)" className="border-gray-300" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categoryImage">Image</Label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="categoryImage"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#CC8C87] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                  >
                   
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-[#CC8C87]" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="categoryImage" type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#CC8C87] hover:bg-[#B87A75] text-white transition-colors duration-200">
                Add Category
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
