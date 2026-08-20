import Link from "next/link";
import styles from "./Footer.module.css";

interface FooterProps {
  adCodeFooter728x90?: string;
}

export default function Footer({ adCodeFooter728x90 }: FooterProps) {
  return (
    <footer className={styles.footer}>
      {/* ADSTERRA FOOTER BANNER SLOT (728x90) */}
      {/* INSTRUCTION: Jab aap ke paas Adsterra ka Footer 728x90 script ho, tab code inject karein */}
      {adCodeFooter728x90 && (
        <div className={styles.footerAdContainer}>
          <div 
            className={styles.adContent}
            dangerouslySetInnerHTML={{ __html: adCodeFooter728x90 }} 
          />
        </div>
      )}

      <div className={styles.footerContent}>
        <div className={styles.brandCol}>
          <h2 className={styles.logo}>DRA<span>MIX</span></h2>
          <p>Watch latest Pakistani, Turkish, Indian, and Korean drama series in HD quality.</p>
        </div>

        <div className={styles.linksCol}>
          <h4>Drama Categories</h4>
          <ul>
            <li><Link href="/category/pakistani-drama">Pakistani Dramas</Link></li>
            <li><Link href="/category/turkish-drama">Turkish Dramas</Link></li>
            <li><Link href="/category/indian-drama">Indian Dramas</Link></li>
            <li><Link href="/category/korean-drama">Korean Dramas</Link></li>
          </ul>
        </div>

        <div className={styles.legalCol}>
          <h4>Legal & Policy</h4>
          <ul>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/dmca">DMCA Disclaimer</Link></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.copyright}>
        <p>© {new Date().getFullYear()} DRAMIX. All rights reserved.</p>
      </div>
    </footer>
  );
}