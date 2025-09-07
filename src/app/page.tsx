"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { categories, getFeaturedProducts } from '@/lib/data';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-16" />
        <div className="relative">
          <div className="container px-4 py-24 md:py-32">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge variant="secondary" className="text-sm font-medium">
                    ✨ Premium Fashion Collection
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white leading-tight">
                    Reejh Mann Di
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-300 font-light">
                    Where tradition meets contemporary elegance
                  </p>
                  <p className="text-lg text-slate-400 max-w-md">
                    Discover our curated collection of premium clothing, 
                    from traditional wear to modern fashion statements.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild className="text-lg px-8">
                    <Link href="/products">
                      Shop Collection 🛍️
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-lg px-8 text-white border-white hover:bg-white hover:text-slate-900">
                    <Link href="/products?category=traditional-wear">
                      Traditional Wear 🪔
                    </Link>
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Free Shipping ₹2,499+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    <span>Premium Quality</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <img 
                    src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a992396f-ef8b-4e5d-9516-ef60a448d734.png"
                    alt="Reejh Mann Di Fashion Collection - Premium traditional and modern clothing"
                    className="w-full h-full object-cover rounded-2xl"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-2xl">
                  <div className="text-2xl font-bold text-slate-900">500+</div>
                  <div className="text-sm text-slate-600">Happy Customers</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-primary text-primary-foreground p-4 rounded-xl shadow-2xl">
                  <div className="text-2xl font-bold">4.9⭐</div>
                  <div className="text-sm opacity-90">Customer Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our carefully curated collections, from traditional ethnic wear 
              to contemporary fashion statements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link 
                key={category.id} 
                href={`/products?category=${category.slug}`}
                className="group"
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                    <img 
                      src={category.image}
                      alt={category.description}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary" className="mb-2">
                        {category.productCount} Products
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Handpicked premium pieces that define our commitment to quality and style.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/products">
                View All Products →
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">
              Why Choose Reejh Mann Di?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience the perfect blend of tradition, quality, and contemporary design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                ✨
              </div>
              <CardTitle className="mb-3">Premium Quality</CardTitle>
              <CardDescription className="text-base">
                Each piece is crafted with attention to detail using finest materials 
                and traditional techniques.
              </CardDescription>
            </Card>

            <Card className="border-0 shadow-lg text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                🎨
              </div>
              <CardTitle className="mb-3">Unique Designs</CardTitle>
              <CardDescription className="text-base">
                Our designs blend traditional aesthetics with contemporary trends 
                for a timeless appeal.
              </CardDescription>
            </Card>

            <Card className="border-0 shadow-lg text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-3xl">
                🤝
              </div>
              <CardTitle className="mb-3">Customer First</CardTitle>
              <CardDescription className="text-base">
                Dedicated customer service, easy returns, and satisfaction guarantee 
                with every purchase.
              </CardDescription>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold">
              Join the Reejh Mann Di Family
            </h2>
            <p className="text-lg opacity-90">
              Be the first to know about new collections, exclusive offers, and styling tips. 
              Subscribe to our newsletter and get 10% off your first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button size="lg" variant="secondary" asChild className="text-primary">
                <Link href="/auth/register">
                  Create Account 📧
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white hover:text-primary">
                <Link href="/products">
                  Start Shopping 🛍️
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}