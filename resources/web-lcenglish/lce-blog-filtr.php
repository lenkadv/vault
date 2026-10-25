<?php
/**
 * Plugin Name: LCE – filtr blogu
 * Description: Nad seznamem článků zobrazí filtr podle pokročilosti (rubriky), podle dovednosti (štítky) a hledání. Náhrada za filtr z Elementor Pro (Claude, 261024).
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function lce_blog_filtr_is_listing() {
	return ! is_admin() && ( is_home() || is_category() || is_tag() || is_search() );
}

add_action( 'loop_start', function ( $query ) {
	static $done = false;
	if ( $done || ! $query->is_main_query() || ! lce_blog_filtr_is_listing() ) {
		return;
	}
	$done = true;

	$select = function ( $taxonomy, $id, $placeholder ) {
		$current = ( is_category() || is_tag() ) ? get_queried_object_id() : 0;
		$terms   = get_terms( array( 'taxonomy' => $taxonomy, 'hide_empty' => true, 'orderby' => 'name' ) );
		$html    = '<select id="' . esc_attr( $id ) . '" class="lce-filtr-select"><option value="">' . esc_html( $placeholder ) . '</option>';
		foreach ( (array) $terms as $term ) {
			$link  = get_term_link( $term );
			$html .= '<option value="' . esc_url( $link ) . '"' . selected( $current, $term->term_id, false ) . '>' . esc_html( $term->name ) . '</option>';
		}
		return $html . '</select>';
	};
	$cat_dropdown = $select( 'category', 'lce-filtr-pokrocilost', 'Filtrovat podle pokročilosti' );
	$tag_dropdown = $select( 'post_tag', 'lce-filtr-dovednost', 'Filtrovat podle dovednosti' );
	$blog_url     = get_permalink( get_option( 'page_for_posts' ) );
	?>
	<div class="lce-blog-filtr">
		<label class="screen-reader-text" for="lce-filtr-pokrocilost">Pokročilost</label>
		<?php echo $cat_dropdown; // phpcs:ignore ?>
		<label class="screen-reader-text" for="lce-filtr-dovednost">Dovednost</label>
		<?php echo $tag_dropdown; // phpcs:ignore ?>
		<form role="search" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>">
			<label class="screen-reader-text" for="lce-filtr-hledat">Hledat</label>
			<input type="search" id="lce-filtr-hledat" name="s" placeholder="Hledat" value="<?php echo esc_attr( get_search_query() ); ?>">
			<button type="submit">Hledat</button>
		</form>
	</div>
	<script>
	(function () {
		document.querySelectorAll('.lce-filtr-select').forEach(function (el) {
			el.addEventListener('change', function () {
				window.location.href = this.value || '<?php echo esc_js( $blog_url ); ?>';
			});
		});
	})();
	</script>
	<?php
} );

add_action( 'wp_head', function () {
	if ( ! lce_blog_filtr_is_listing() ) {
		return;
	}
	?>
	<style>
	.lce-blog-filtr{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:12px;margin:0 0 24px;padding:16px;background:#EFE6DB}
	.lce-blog-filtr select,.lce-blog-filtr input[type=search]{min-height:44px;padding:8px 12px;border:0;background:#fff;font-family:inherit;font-size:15px}
	.lce-blog-filtr select{flex:1 1 220px}
	.lce-blog-filtr form{display:flex;flex:1 1 260px}
	.lce-blog-filtr input[type=search]{flex:1;min-width:0}
	.lce-blog-filtr button{min-height:44px;padding:8px 16px;border:0;border-radius:4px;background:#D1003A;color:#fff;font-weight:700;cursor:pointer}
	.lce-blog-filtr button:hover{background:#A8002E}
	</style>
	<?php
} );

/**
 * [lce-posledni-clanky pocet="6"] – mřížka posledních článků s obrázkem (náhrada widgetu Portfolio z Elementor Pro na hlavní stránce).
 */
add_shortcode( 'lce-posledni-clanky', function ( $atts ) {
	$atts  = shortcode_atts( array( 'pocet' => 6 ), $atts );
	$posts = get_posts( array( 'numberposts' => (int) $atts['pocet'], 'post_status' => 'publish' ) );
	if ( ! $posts ) {
		return '';
	}
	$html = '<div class="lce-posledni-clanky">';
	foreach ( $posts as $post ) {
		$img   = get_the_post_thumbnail( $post, 'medium_large', array( 'loading' => 'lazy' ) );
		$html .= '<a class="lce-pc-item" href="' . esc_url( get_permalink( $post ) ) . '">' . $img . '<span class="lce-pc-title">' . esc_html( get_the_title( $post ) ) . '</span></a>';
	}
	$html .= '</div><style>.lce-posledni-clanky{display:grid;grid-template-columns:repeat(3,1fr);gap:4px}.lce-pc-item{position:relative;display:block;aspect-ratio:3/2;overflow:hidden}.lce-pc-item img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s}.lce-pc-item:hover img{transform:scale(1.04)}.lce-pc-title{position:absolute;left:0;right:0;bottom:0;padding:10px 12px;background:rgba(26,20,22,.82);color:#fff;font-size:15px;line-height:1.3;opacity:0;transition:opacity .2s}.lce-pc-item:hover .lce-pc-title,.lce-pc-item:focus .lce-pc-title{opacity:1}@media(max-width:767px){.lce-posledni-clanky{grid-template-columns:repeat(2,1fr)}.lce-pc-title{opacity:1;font-size:13px}}</style>';
	return $html;
} );

/**
 * Hlavní stránka: úvodní fotku (pozadí sekce Elementoru) stáhnout přednostně, ať se zobrazí dřív.
 */
add_action( 'wp_head', function () {
	if ( ! is_front_page() ) {
		return;
	}
	$base = content_url( '/uploads/2025/08/' );
	echo '<link rel="preload" as="image" fetchpriority="high" href="' . esc_url( $base . 'web-background-scaled-e1754567273900.jpg' ) . '" media="(max-width: 767px)">' . "\n";
	echo '<link rel="preload" as="image" fetchpriority="high" href="' . esc_url( $base . 'bckg2web-scaled.jpg' ) . '" media="(min-width: 768px)">' . "\n";
}, 2 );

/**
 * Nová hlavní stránka z bloků WordPressu (bez Elementoru): vzhled log, čísel a části „o mně“.
 * Platí pro hlavní stránku a pro testovací /nova-domovska/ (ta je do přepnutí skrytá vyhledávačům).
 */
add_action( 'wp_head', function () {
	if ( is_page( 'nova-domovska' ) && ! is_front_page() ) {
		echo '<meta name="robots" content="noindex, nofollow">' . "\n";
	}
	if ( ! ( is_front_page() || is_page( 'nova-domovska' ) ) ) {
		return;
	}
	?>
	<style>
	.lce-hero .wp-block-cover__inner-container{max-width:1100px;margin:0 auto;padding:0 24px}
	.lce-hero h1{color:#fff !important;text-shadow:0 1px 12px rgba(0,0,0,.3)}
	.lce-hero .wp-block-cover__background{background:#000;opacity:.08}
	.lce-cisla{background:#1A1416 !important;color:#fff !important}
	.lce-cisla .lce-cislo strong,.lce-cisla .lce-cislo span{color:#fff}
	.lce-loga-row{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:24px;max-width:1100px;margin:0 auto}
	.lce-loga-row img{width:110px;height:110px;object-fit:contain;filter:grayscale(1);opacity:.85}
	.lce-cisla-row{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:1100px;margin:0 auto;text-align:center}
	.lce-cislo strong{display:block;font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2.4rem,5vw,3.6rem);line-height:1.1;font-weight:400;color:#E6A93B !important}
	.lce-cislo span{display:block;font-family:'Karla',Arial,sans-serif;font-size:18px;opacity:.9}
	.lce-podpis{font-family:'DM Serif Display',Georgia,serif;font-size:1.7rem;color:#1A1416;margin-top:8px}
	.lce-portret img{border-radius:4px}
	@media (max-width:767px){
		.lce-cisla-row{grid-template-columns:repeat(2,1fr)}
		.lce-loga-row{justify-content:center}
		.lce-loga-row img{width:84px;height:84px}
		.lce-hero{min-height:70vh !important}
		.lce-o-mne,.lce-blog-home{padding-left:20px !important;padding-right:20px !important}
		.lce-o-mne .wp-block-columns{gap:24px}
		/* Ikona menu na mobilu: bílá, ať nezaniká ve fotce (jemný stín jen pro čitelnost na světlých místech). */
		#mobile-header .menu-toggle-open{color:#fff !important}
		#mobile-header .menu-toggle-open .menu-toggle-icon{font-size:28px;filter:drop-shadow(0 1px 2px rgba(0,0,0,.45))}
	}
	</style>
	<?php
}, 20 );

/**
 * Kurzy a Kontakt z bloků WordPressu (bez Elementoru).
 */
add_action( 'wp_head', function () {
	if ( is_page( array( 'kurzy-novy', 'kontakt-novy' ) ) ) {
		echo '<meta name="robots" content="noindex, nofollow">' . "\n";
	}
	if ( ! is_page( array( 'kurzy', 'kurzy-novy', 'contact', 'kontakt-novy' ) ) ) {
		return;
	}
	?>
	<style>
	.lce-kurzy-nadpis{margin:40px auto 32px;max-width:900px;padding:0 20px;font-size:clamp(2rem,4.5vw,3rem);line-height:1.15}
	.lce-kurzy{background:#EFE6DB;padding:40px 20px 56px}
	.lce-kurzy-cols{gap:40px}
	.lce-kurzy-cols{align-items:stretch !important}
	.lce-kurz{display:flex !important;flex-direction:column}
	.lce-kurz-img{margin:0 0 16px}
	/* Místo pro obrázek kurzu vyhrazené předem: bez !important měl obrázek před načtením šířku 0 a text pod ním poskočil (CLS). */
	.lce-kurz-img{display:block !important;width:100% !important}
	.lce-kurz-img a{display:block}
	.lce-kurz-img img{width:100% !important;height:auto;aspect-ratio:16/11;object-fit:cover;display:block}
	.lce-kurz-nazev{font-size:1.7rem;line-height:1.2;margin:0 0 16px;min-height:2.4em;display:flex;align-items:center;justify-content:center}
	.lce-kurzy-nadpis{min-height:2.3em}
	.lce-kurz-nazev a{color:#1A1416;text-decoration:none}
	.lce-kurz p{margin:0 0 24px}
	.lce-kurz-btn{margin-top:auto !important}
	.lce-kurz-btn .wp-block-button__link{background:#D1003A;color:#fff;border-radius:4px;padding:13px 26px;font-family:'Karla',Arial,sans-serif;font-size:18px;font-weight:700;text-decoration:none}
	.lce-kurz-btn .wp-block-button__link:hover{background:#A8002E}
	.lce-kontakt{background:#EFE6DB;padding:56px 20px 64px;margin:0}
	.lce-kontakt h1{color:#1A1416;font-size:clamp(2.2rem,5vw,3.2rem);margin:0 0 24px}
	.lce-kontakt .ff-el-group label{color:#1A1416}
	.lce-kontakt .ff-btn-submit{background:#D1003A !important;border-color:#D1003A !important;color:#fff !important;border-radius:4px !important;font-weight:700}
	.lce-kontakt .ff-btn-submit:hover{background:#A8002E !important}
	/* Na mobilu Kadence u bloků přes celou šířku ruší vnitřní okraj, text by šel od kraje ke kraji. */
	@media (max-width:767px){
		.lce-kurzy,.lce-kontakt{padding-left:24px !important;padding-right:24px !important;margin-left:0 !important;margin-right:0 !important}
		.lce-kurzy-nadpis{padding-left:24px !important;padding-right:24px !important}
	}
	</style>
	<?php
}, 21 );

/**
 * Přednačíst i české znaky (sada latin-ext) dvou písem webu (DM Serif Display, Karla; od 261025), ať se text po načtení nepřeskládá.
 * Kadence sám přednačítá jen základní latinku. Při změně písma v Kadence je potřeba názvy souborů aktualizovat.
 */
add_action( 'wp_head', function () {
	$base  = content_url( '/fonts/' );
	$fonty = array(
		'dm-serif-display/-nFnOHM81r4j6k0gjAW3mujVU2B2G_5x0ujy.woff2',
		'karla/qkB9XvYC6trAT55ZBi1ueQVIjQTD-JrIH2G7nytkHRyQ8p4wUjm6bnEr.woff2',
	);
	foreach ( $fonty as $f ) {
		echo '<link rel="preload" href="' . esc_url( $base . $f ) . '" as="font" type="font/woff2" crossorigin>' . "\n";
	}
}, 1 );

/**
 * Objednávka Nepravidelných sloves (/irregular-cho/) z bloků WordPressu: formulář FAPI vlevo, reference vpravo.
 */
add_action( 'wp_head', function () {
	if ( ! is_page( array( 'irregular-cho', 'irregular-cho-novy' ) ) ) {
		return;
	}
	?>
	<style>
	.lce-cho{padding:56px 20px 64px}
	.lce-cho h1{color:#1A1416;font-size:clamp(2.2rem,5vw,3.4rem);margin:0 0 12px}
	.lce-cho-podnadpis{font-family:'DM Serif Display',Georgia,serif;font-size:1.4rem;color:#1A1416;margin:0 0 20px}
	.lce-cho-cara{border:0 !important;border-top:3px solid #FF0044 !important;width:100% !important;max-width:100% !important;margin:0 0 40px !important;opacity:1}
	.lce-cho-cols{gap:48px}
	.lce-ref{margin:0 0 28px;padding:0 0 28px;border-bottom:1px solid #E2D6C8;text-align:center;position:relative}
	.lce-ref::after{content:"★";position:absolute;left:50%;bottom:-0.75em;transform:translateX(-50%);background:#fff;color:#E6A93B;padding:0 8px;font-size:18px}
	.lce-ref blockquote{margin:0 0 16px;padding:0;border:0;font-style:normal;font-size:16px;line-height:1.7;color:#1A1416}
	.lce-ref figcaption{display:flex;align-items:center;justify-content:center;gap:12px;font-size:16px}
	.lce-ref img{width:60px;height:60px;border-radius:50%;object-fit:cover}
	body.page .site{background:#fff}
	</style>
	<?php
}, 22 );

/**
 * Stránky převedené z Elementoru (HELE, Den angličtiny): obsah zabalený v bloku se třídou lce-lp.
 */
add_action( 'wp_head', function () {
	if ( ! is_singular() || false === strpos( (string) get_post_field( 'post_content', get_queried_object_id() ), 'lce-lp' ) ) {
		return;
	}
	?>
	<style>
	.lce-lp{padding:40px 0 60px}
	.lce-lp > *:not(.alignfull),.lce-lp .lce-sekce > *{max-width:900px;margin-left:auto;margin-right:auto;padding-left:20px;padding-right:20px;box-sizing:border-box}
	.lce-lp .lce-sekce{margin:40px 0}
	.lce-lp h1,.lce-lp h2,.lce-lp h3,.lce-lp h4{color:#1A1416;margin:24px auto 12px}
	.lce-lp .lce-text{font-size:18px;line-height:1.7}
	.lce-lp .lce-text p{margin:0 0 14px}
	.lce-lp img{max-width:100%;height:auto}
	.lce-lp .wp-block-image{margin:20px auto}
	.lce-lp .wp-block-columns{gap:32px;margin:24px auto}
	.lce-lp .wp-block-column > *{padding-left:0;padding-right:0}
	.lce-lp .lce-btn{margin:24px auto}
	.lce-lp .lce-btn .wp-block-button__link{background:#D1003A;color:#fff;font-family:'Karla',Arial,sans-serif;font-weight:700;border-radius:4px;padding:14px 32px;font-size:18px}
	.lce-lp .lce-btn .wp-block-button__link:hover{background:#A8002E}
	.lce-lp .wp-block-embed{margin:24px auto}
	.lce-lp details{border-bottom:1px solid #E2D6C8;padding:12px 0}
	.lce-lp summary{font-weight:700;color:#1A1416;cursor:pointer;font-size:18px}
	.lce-lp .lce-cara{border:0;border-top:2px solid #E6A93B;opacity:1}
	</style>
	<?php
}, 23 );

/**
 * Písma bez poskakování textu: styl písem Kadence (soubor ve wp-content/fonts/) se vloží přímo do stránky
 * a místo font-display: swap dostane optional. Písma jsou přednačtená, takže se obvykle stihnou;
 * když ne, zůstane pro danou návštěvu náhradní písmo a text se po načtení nepřeskládá (Kurzy, CLS 0,36).
 */
add_filter( 'style_loader_tag', function ( $tag, $handle, $href ) {
	if ( is_admin() || 'kadence-fonts-gfonts' !== $handle ) {
		return $tag;
	}
	$soubor = WP_CONTENT_DIR . '/fonts/' . basename( (string) wp_parse_url( $href, PHP_URL_PATH ) );
	if ( ! is_readable( $soubor ) ) {
		return $tag;
	}
	$css = preg_replace( '/font-display:\s*swap/', 'font-display: optional', (string) file_get_contents( $soubor ) );
	return "<style id='lce-pisma'>\n" . $css . "</style>\n";
}, 10, 3 );
