import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <div>
                <h3 className="font-playfair text-lg font-bold tracking-tight">
                  Reejh Mann Di
                </h3>
                <p className="text-xs text-muted-foreground -mt-1">Premium Fashion</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Discover the finest collection of traditional and modern clothing. 
              Quality craftsmanship meets contemporary design.
            </p>
            <div className="flex space-x-4 text-sm">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                📘 Facebook
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                📷 Instagram
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                🐦 Twitter
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=mens-collection" className="text-muted-foreground hover:text-primary transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link href="/products?category=womens-collection" className="text-muted-foreground hover:text-primary transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link href="/products?category=traditional-wear" className="text-muted-foreground hover:text-primary transition-colors">
                  Traditional Wear
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="text-muted-foreground hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?featured=true" className="text-muted-foreground hover:text-primary transition-colors">
                  Featured Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-muted-foreground hover:text-primary transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-muted-foreground hover:text-primary transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-primary transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-muted-foreground hover:text-primary transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-muted-foreground">
            <p>© {currentYear} Reejh Mann Di. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>We Accept:</span>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-1 bg-muted rounded text-xs">💳 VISA</span>
              <span className="px-2 py-1 bg-muted rounded text-xs">💳 MC</span>
              <span className="px-2 py-1 bg-muted rounded text-xs">🅿️ PayPal</span>
              <span className="px-2 py-1 bg-muted rounded text-xs">📱 UPI</span>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 pt-6 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-start space-x-3">
              <span className="text-primary">🚚</span>
              <div>
                <h5 className="font-medium text-foreground">Free Shipping</h5>
                <p>On orders above ₹2,499</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary">↩️</span>
              <div>
                <h5 className="font-medium text-foreground">Easy Returns</h5>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-primary">📞</span>
              <div>
                <h5 className="font-medium text-foreground">24/7 Support</h5>
                <p>Customer service available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}