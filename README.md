# perlin-noise-generator-js
Alexander Yermakov's Perlin noise generator ported to JS
# Usage
```
<script src="md5.min.js"></script>
<script src="MersenneTwister.min.js"></script>
<script src="perlin.js"></script>
```
```
let gen=new PerlinNoiseGenerator();
gen.setSize(100); // heightmap size: 100x100
gen.setPersistence(.8); // map roughness 
gen.setMapSeed("value"); // optional
let map=gen.generate();
```
