import Image from "next/image"
import { Section } from "@/components/ui/section"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog"

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1581578731117-104f2a8d275d?q=80&w=1920&auto=format&fit=crop",
    alt: "Living room cleaning",
  },
  {
    src: "https://images.unsplash.com/photo-1527513913470-4e5c91dd7e8d?q=80&w=1920&auto=format&fit=crop",
    alt: "Kitchen deep clean",
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1920&auto=format&fit=crop",
    alt: "Bathroom sparkling clean",
  },
  {
    src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1920&auto=format&fit=crop",
    alt: "Bedroom organization",
  },
  {
    src: "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=1920&auto=format&fit=crop",
    alt: "Window cleaning service",
  },
  {
    src: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?q=80&w=1920&auto=format&fit=crop",
    alt: "Office cleaning",
  },
]

export function Gallery() {
  return (
    <Section className="bg-muted/30" padding="large">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Work Gallery</h2>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          See the sparkling results of our professional cleaning services.
        </p>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {galleryImages.map((image, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="overflow-hidden rounded-xl border bg-background shadow-sm cursor-pointer hover:opacity-90 transition-opacity">
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </AspectRatio>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full p-0 overflow-hidden border-none bg-transparent shadow-none">
                    <DialogTitle className="sr-only">{image.alt}</DialogTitle>
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-background">
                       <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-contain"
                          priority
                          sizes="(max-width: 768px) 100vw, 90vw"
                        />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
    </Section>
  )
}
