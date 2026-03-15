
import Link from "next/link";
import css from "./page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={css.hero}>
      <Image
        src="/home-picture.png"
        alt="Background"
        fill
        priority
        className={css.background}
      />
    <div className={css.container}>

      <div className={css.wrapper}>
        <div className={css.title_wrapper}>
          <h1 className={css.title}>Find your perfect rental car</h1>
          <p className={css.text}>Reliable and budget-friendly rentals for any journey</p>
        </div>
        

       
          <Link className={css.button} href={`/catalog`}>View Catalog</Link>
       
      </div>
    </div>
    </div>
  );
}