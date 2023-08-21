#define PI 3.1415926535897932384626433832795 // 180 degrees

varying vec2 vUv;//receive UV from Vertex material
uniform float uTime;

//Random function
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

//Rotation function
vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}


vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}

//	Classic Perlin 2D Noise 
//	by Stefan Gustavson
//
vec2 fade(vec2 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec2 P)
{
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
}

void main ()
{
//    float strenght = vUv.x *10 // multiply patten
    // gl_FragColor = vec4(vUv, 0.5, 1); //color gradient
    //    float strenght = mod(vUv.x * 10.0, 1.0); // multiply patten
        //    strenght = step(0.5, strenght);//Change step to increase the gap between strips
            //    float strenght = step(0.8, mod(vUv.x * 10.0, 1.0)); // combine code to have grid
            //    strenght += step(0.8, mod(vUv.y * 10.0, 1.0));// += grid
            //   strenght *= step(0.8, mod(vUv.y * 10.0, 1.0));//*= - to have dots
            
            //Cross pattern
            //    float barX = step(0.4, mod(vUv.x * 10.0, 1.0)); 
            //    barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));

            //    float barY = step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0)); 
            //    barY *= step(0.4, mod(vUv.y * 10.0, 1.0));

            //    float strenght = barX + barY;

// float strenght = abs(vUv.x - 0.5); // dispace pattern

// float strenght = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)); // maxumum value blending
// float strenght = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5)); // minimum value blending

// float strenght = step(0.1, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5))); // big square

// float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5))); // two squares
// float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
// float strenght = square1 * square2;


// float strenght = floor(vUv.x * 10.0) / 10.0;//step gradient
// float strenght = floor(vUv.x * 10.0) / 10.0;//step cross gradient
//  strenght *= floor(vUv.y * 10.0) / 10.0;

// We are using the random function outside of the main()
// float strenght = random(vUv); // random noise

//Random square grid
// vec2 gridUv = vec2(
//     floor(vUv.x * 10.0) / 10.0,
//     floor(vUv.y * 10.0) / 10.0
// );
// float strenght = random(gridUv); // random noise

//Dispacement texture vUv
// vec2 gridUv = vec2(
//     floor(vUv.x * 10.0) / 10.0,
//     floor((vUv.x + vUv.y * 0.5) * 10.0) / 10.0
// );
// float strenght = random(gridUv); // random noise

// float strenght = length(vUv); // radial gradient from 0
// float strenght = length(vUv - 0.5); // radial gradient from the center
// float strenght = distance(vUv, vec2(0.5)); // alt way to draw radial gradient from thew center using the distance method
// float strenght = 1.0 - distance(vUv, vec2(0.5)); // invent previous
// float strenght = 0.03 / distance(vUv, vec2(0.5)); // star effect

//How to strech uV
// vec2 lightUv = vec2(
// vUv.x * 0.1 + 0.45,
// vUv.y * 0.5 + 0.25
// );
// float strenght = 0.03 / distance(lightUv, vec2(0.5)); // star effect

//Star made from two beams
// vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);
// float lightX = 0.03 / distance(lightUvX, vec2(0.5)); // star effect

// vec2 lightUvY = vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25);
// float lightY = 0.03 / distance(lightUvY, vec2(0.5)); // star effect

// float strenght = lightX * lightY; 

//Star made from two beams with rotation using function above

// vec2 rotateUv = rotate(vUv, PI * 0.25, vec2(0.5)); //rotate(vUv, 0.5 - rotation, vec2(0.5) - anchor point);

// vec2 lightUvX = vec2(rotateUv.x * 0.1 + 0.45, rotateUv.y * 0.5 + 0.25);
// float lightX = 0.03 / distance(lightUvX, vec2(0.5)); // star effect

// vec2 lightUvY = vec2(rotateUv.y * 0.1 + 0.45, rotateUv.x * 0.5 + 0.25);
// float lightY = 0.03 / distance(lightUvY, vec2(0.5)); // star effect

// float strenght = lightX * lightY; 

// float strenght = 1.0 - step(0.2, distance(vUv, vec2(0.5))); // circle B&W 1.0 or 1.0 -

// float strenght = abs(distance(vUv, vec2(0.5)) - 0.25); // smooth radial gradinent

// float strenght = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25)); // sharp circle


//wave distortion
// vec2 wavedUv = vec2 (
//     vUv.x + sin(vUv.y * 40.0) * 0.1,
//     vUv.y + sin(vUv.x * 30.0) * 0.1
// );

// float strenght = 1.0 - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25)); // sharp circle

//angle from uV 0
// float angle = atan(vUv.x, vUv.y);
// float strenght = angle;


//angle from uV 0.5
// float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
// float strenght = angle;

//cone gradient
// float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
// angle /= PI * 2.0;
// angle += 0.5;
// float strenght = angle;

//multiply cone gradient across circle direction
// float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
// angle /= PI * 2.0;
// angle += 0.5;
// angle *= 10.0;
// angle = mod(angle, 1.0);
// float strenght = angle;

//beams from the center
// float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
// angle /= PI * 2.0;
// angle += 0.5;
// float strenght = sin(angle * 100.0);

//Star
// float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
// angle /= PI * 2.0;
// angle += 0.5;
// float sinusoid = sin(angle * 100.0);
// float raduis = 0.25 + sinusoid * 0.02;
// float strenght = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - raduis));

//Smooth Noise 
// float strenght = cnoise(vUv * 10.0);

//Sharp Noise
// float strenght = step(0.1, cnoise(vUv * 20.0));

//Noise substracted
// float strenght = 1.0 - abs(cnoise(vUv * 20.0));

//sharp Noise substracted 
// float strenght = 1.0 - step(0.1, sin(cnoise(vUv * 10.0) * 20.0));


//sharp Noise substracted 
float strenght = 1.0 - step(0.1, sin(cnoise(((vUv * 20.0)) * sin(uTime / 40.0))) );
strenght = clamp(strenght, 0.0, 1.0); // will not give the color to have blending areas

vec3 waveColor = vec3(0.5, 0.85, 0.95);
vec3 waterColor = vec3(0.6, 0.95, 0.97);
vec3 mixedColor = mix(waveColor, waterColor, strenght);

    gl_FragColor = vec4(mixedColor, 1.0); //Color gradient B&W

    // gl_FragColor = vec4(strenght, strenght, strenght, 1.0); //Linear gradient B&W
}
