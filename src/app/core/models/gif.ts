export interface GifImage {
  url: string;
  width: number;
  height: number;
  size?: number;
  mp4?: number;
  mp4_size?: number;
  webp?: number;
  webp_size?: number;
}

export interface GifImages {
  fixed_height: GifImage;
  fixed_height_still: GifImage;
  fixed_height_downsampled: GifImage;
  fixed_width: GifImage;
  fixed_width_still: GifImage;
  fixed_width_downsampled: GifImage;
  fixed_height_small: GifImage;
  fixed_height_small_still: GifImage;
  fixed_width_small: GifImage;
  fixed_width_small_still: GifImage;
  downsized: GifImage;
  downsized_still: GifImage;
  downsized_large: GifImage;
  original: GifImage;
  original_still: GifImage;
}

export interface Gif {
  type: string;
  id: string;
  slug: string;
  url: string;
  bitly_gif_url: string;
  bitly_url: string;
  embed_url: string;
  username: string;
  source: string;
  rating: string;
  caption: string;
  content_url: string;
  source_tld: string;
  source_post_url: string;
  import_datetime: string;
  trending_datetime: string;
  images: GifImages;
}
