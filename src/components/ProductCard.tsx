"use client";

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;

    setIsAdding(true);

    try {
      // For quick add, use default variants (first option of each variant)
      const defaultVariants: { [key: string]: string } = {};
      product.variants.forEach(variant => {
        if (variant.options.length > 0) {
          defaultVariants[variant.name] = variant.options[0].value;
        }
      });

      addToCart(product, 1, defaultVariants);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setTimeout(() => setIsAdding(false), 1000);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="border-0 shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02] overflow-hidden">
        <CardHeader className="p-0">
          <div className="aspect-[4/5] relative overflow-hidden">
            <img 
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.featured && (
                <Badge variant="secondary" className="text-xs font-medium bg-yellow-100 text-yellow-800 border-yellow-200">
                  ⭐ Featured
                </Badge>
              )}
              {discountPercentage > 0 && (
                <Badge variant="destructive" className="text-xs font-medium">
                  {discountPercentage}% OFF
                </Badge>
              )}
            </div>

            {/* Stock status */}
            <div className="absolute top-3 right-3">
              {product.stock <= 5 && product.stock > 0 && (
                <Badge variant="outline" className="text-xs bg-orange-50 text-orange-800 border-orange-200">
                  Only {product.stock} left
                </Badge>
              )}
              {product.stock === 0 && (
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-800">
                  Out of Stock
                </Badge>
              )}
            </div>

            {/* Quick Add Button */}
            {showQuickAdd && product.stock > 0 && (
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  onClick={handleQuickAdd}
                  disabled={isAdding}
                  className="shadow-lg"
                >
                  {isAdding ? '⏳' : '🛒'}
                  <span className="sr-only">Quick add to cart</span>
                </Button>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            
            {/* Category */}
            <div className="text-xs text-muted-foreground">
              {product.category}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="w-full space-y-3">
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">⭐</span>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>
              
              {isInCart(product.id) && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-800 border-green-200">
                  ✓ In Cart
                </Badge>
              )}
            </div>

            {/* Variants Preview */}
            {product.variants.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {product.variants.slice(0, 2).map((variant) => (
                  <div key={variant.id} className="text-xs text-muted-foreground">
                    {variant.options.length} {variant.name.toLowerCase()}{variant.options.length > 1 ? 's' : ''}
                  </div>
                ))}
                {product.variants.length > 2 && (
                  <div className="text-xs text-muted-foreground">
                    +{product.variants.length - 2} more
                  </div>
                )}
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}