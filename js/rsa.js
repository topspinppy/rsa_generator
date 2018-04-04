
function gcd (a, b)
{
   var r;
   while (b>0)
   {
      r=a%b;
      a=b;
      b=r;
   }
   return a;
}

function rel_prime(phi)
{
   var rel=5;

   while (gcd(phi,rel)!=1)
      rel++;
   return rel;
}

function power(a, b)
{
   var temp=1, i;
   for(i=1;i<=b;i++)
      temp*=a;
    return temp;
}

function encrypt(N, e, M)
{
   var r,i=0,prod=1,rem_mod=0;
   while (e>0)
   {
      r=e % 2;
      if (i++==0)
         rem_mod=M % N;
      else
         rem_mod=power(rem_mod,2) % N;
      if (r==1)
      {
         prod*=rem_mod;
         prod=prod % N;
      }
      e=parseInt(e/2);
   }
   return prod;
}

function calculate_d(phi,e)
{
   var x,y,x1,x2,y1,y2,temp,r,orig_phi;
   orig_phi=phi;
   x2=1;x1=0;y2=0;y1=1;
   while (e>0)
   {
      temp=parseInt(phi/e);
      r=phi-temp*e;
      x=x2-temp*x1;
      y=y2-temp*y1;
      phi=e;e=r;
      x2=x1;x1=x;
      y2=y1;y1=y;
      if (phi==1)
      {
         y2+=orig_phi;
         break;
      }
   }
   return y2;
}

function decrypt(c, d, N)
{
   var r,i=0,prod=1,rem_mod=0;
   while (d>0)
   {
      r=d % 2;
      if (i++==0)
         rem_mod=c % N;
      else
         rem_mod = power(rem_mod,2) % N;
      if (r==1)
      {
         prod*=rem_mod;
         prod=prod % N;
      }
      d=parseInt(d/2);
   }
   return prod;
}


function openNew()
{
   var p=parseInt(document.Input.p.value);
   var q=parseInt(document.Input.q.value);
   var M=parseInt(document.Input.M.value);
   var N=p * q;
   var phi=(p-1)*(q-1);
   var e=rel_prime(phi);
   var c=encrypt(N,e,M);
   var d=calculate_d(phi,e);
   alert("N = p * q >> "+N+"\n"+"phi = ( p - 1 ) * ( q - 1) >> "+phi+"\n"+"GCD ( phi , e ) = 1 >>"+e+"\n"+"Encrypted Text ( c ) = M^e * ( mod N )>>"+c+"\n"+" e * d = 1 * ( mod phi ) >>"+d+"\n"+"Decrypted Text = cd * ( mod N )"+decrypt(c,d,N));
   document.getElementById("one").innerHTML = N;
   document.getElementById("two").innerHTML = phi;
   document.getElementById("three").innerHTML = e;
   document.getElementById("four").innerHTML = c;
   document.getElementById("five").innerHTML = d;
   document.getElementById("six").innerHTML = decrypt(c,d,N);
}

// end scripting here -->