insert into public.places
  (name, location, type, address, pet_size, friendly_level, additional_info)
values
  ('Supa Burger', st_point(-73.946823, 40.807416), 'restaurant', '123 Main St', 1, 1, '{"images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"], "description": "A burger place"}'),
  ('Supa Pizza', st_point(-73.94581, 40.807475), 'restaurant', '123 Main St', 1, 1, '{"images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"], "description": "A pizza place"}'),
  ('Supa Taco', st_point(-73.945826, 40.80629), 'restaurant', '123 Main St', 1, 1, '{"images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"], "description": "A taco place"}');
