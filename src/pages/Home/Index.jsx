import ProductCard from "@/components/ProductCard.jsx";

const Index = () => {
  const products = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
      name: "Memory Foam Deluxe",
      price: 13000,
      rating: 4.8,
      reviews: 1224,
      badge: "Best Seller",
      features: [
        "10 Year Warranty • No Cost EMI",
        "Pressure relief foam",
        "Full body support • Cool comfort",
      ],
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      name: "Ortho Memory Foam",
      price: 13000,
      rating: 4.6,
      reviews: 982,
      badge: "Premium",
      features: [
        "10 Year Warranty • No Cost EMI",
        "Pressure relief foam",
        "Full body support • Cool comfort",
      ],
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&q=80",
      name: "Cloud Comfort Plus",
      price: 13000,
      rating: 4.9,
      reviews: 1456,
      badge: "Top Rated",
      features: [
        "10 Year Warranty • No Cost EMI",
        "Pressure relief foam",
        "Full body support • Cool comfort",
      ],
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
      name: "Luxury Sleep Pro",
      price: 13000,
      rating: 4.7,
      reviews: 1103,
      features: [
        "10 Year Warranty • No Cost EMI",
        "Pressure relief foam",
        "Full body support • Cool comfort",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-5" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Find Your Perfect Mattress
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience unparalleled comfort with our premium collection of memory foam mattresses
            </p>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          Premium mattresses with 10-year warranty and easy EMI options
        </p>
      </footer>
    </div>
  );
};

export default Index;