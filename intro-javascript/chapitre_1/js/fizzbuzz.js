for(var i=0; i<=100; i++){
  if(i%15==0){
      if(i==0){
        console.log(i);
        }
        else{
          console.log('fizzbuzz');
        }
  }
  else if(i%5==0){
    console.log('buzz');
  }
  else if(i%3==0){
    console.log('fizz');
  }
  else {
    console.log(i);
  }
}
