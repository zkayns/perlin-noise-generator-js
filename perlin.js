class PerlinNoiseGenerator {
    #twister=new MersenneTwister(0);
    terra=0;
    persistence=0;
    size=0;
    static SIZE='size';
    static PERSISTENCE='persistence';
    static MAP_SEED='map_seed';
    mapSeed=0;
    numericMapSeed=0;
    constructor() {};
    getMapSeed() {
      return this.mapSeed;
    };
    setMapSeed(mapSeed) {
        if (typeof mapSeed!="string"&&typeof mapSeed!="number") throw new TypeError(`mapSeed must be string or numeric, ${typeof mapSeed} given`);
        this.mapSeed=mapSeed;
        this.numericMapSeed=(typeof mapSeed=="number")?mapSeed:parseInt(md5(mapSeed).substr(-8), 16);
    };
    generate(options={}) {
        this.setOptions(options);
        this.initTerra();
        for (let k=0; k<this.getOctaves(); k++) this.octave(k);
        return this.terra;
    };
    setOptions(options) {
        if (PerlinNoiseGenerator.MAP_SEED in options) this.setMapSeed(options[PerlinNoiseGenerator.MAP_SEED]);
        if (PerlinNoiseGenerator.SIZE in options) this.setSize(options[PerlinNoiseGenerator.SIZE]);
        if (PerlinNoiseGenerator.PERSISTENCE in options) this.setPersistence(options[PerlinNoiseGenerator.SIZE]);
    };
    octave(octave) {
        let freq=Math.pow(2, octave);
        let amp=Math.pow(this.persistence, octave);
        let n=freq+1;
        let m=freq+1;
        let arr=new Array();
        for (let j=0; j<m; j++) {
            arr[j]=new Array();
            for (let i=0; i<n; i++) arr[j][i]=this.random()*amp;
        };
        let nx=this.size/(n-1);
        let ny=this.size/(m-1);
        for (let ky=0; ky<this.size; ky++) {
            for (let kx=0; kx<this.size; kx++) {
                let i=parseInt(kx/nx);
                let j=parseInt(ky/ny);
                let dx0=kx-i*nx;
                let dx1=nx-dx0;
                let dy0=ky-j*ny;
                let dy1=ny-dy0;
                let z=(arr[j][i]*dx1*dy1+arr[j][i+1]*dx0*dy1+arr[j+1][i]*dx1*dy0+arr[j+1][i+1]*dx0*dy0)/(nx*ny);
                this.terra[ky][kx]+=z;
            };
        };
    };
    initTerra() {
        if (!this.mapSeed) this.setMapSeed(Math.floor((performance.timeOrigin+performance.now())*1000));
        if (!this.getPersistence()) throw new Error('Persistence must be set');
        if (!this.getSize()) throw new Error('Size must be set');
        this.#twister=new MersenneTwister(this.numericMapSeed*this.persistence*this.size);
        this.terra=new Array(this.size);
        for (let y=0; y<this.size; y++) {
            this.terra[y]=new Array(this.size);
            for (let x=0; x<this.size; x++) this.terra[y][x]=0;
        };
    };
    random() {
        return this.#twister.int31()/2147483647;
    };
    getOctaves() {
        return Math.log(this.size, 2);
    };
    getSizes() {
        return this.getSize();
    };
    getSize() {
        return this.size;
    };
    setSize(size) {
        if (!Number.isInteger(size)) throw new TypeError(`Sizes must be int, ${typeof size} given`);
        this.size=size;
    };
    getPersistence() {
        return this.persistence;
    };
    setPersistence(persistence) {
        if (typeof persistence!="number") throw new TypeError(`persistence must be numeric, ${typeof persistence} given`);
        this.persistence=persistence;
    };
};