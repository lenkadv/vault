<?php
/**
 * Plugin Name: LD – měřicí kódy
 * Description: Vkládá Google Analytics 4 (G-HXGVN58MPM, vlastnost lenkadvorakova.cz 321787141) na všechny stránky webu lenkadvorakova.cz. Meta pixel záměrně ne (Lenka 261025). Claude, 261025.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

const LD_MERENI_GA4 = 'G-HXGVN58MPM';

function ld_mereni_ga4() {
	if ( is_admin() || is_preview() || ( function_exists( 'is_customize_preview' ) && is_customize_preview() ) ) {
		return;
	}
	// Přihlášenou majitelku webu neměřit, ať nezkresluje návštěvnost.
	if ( current_user_can( 'edit_posts' ) ) {
		return;
	}
	$id = esc_attr( LD_MERENI_GA4 );
	echo "\n<script async src=\"https://www.googletagmanager.com/gtag/js?id={$id}\"></script>\n";
	echo "<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','{$id}');</script>\n";
}

add_action( 'wp_head', 'ld_mereni_ga4', 1 );
