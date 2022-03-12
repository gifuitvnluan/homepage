<?php 
require_once "inc/Feed.php" ; //rss-phpライブラリを読み込みます
$feed = new Feed ;
$url = "https://waiting.belugaweb.com/feed"; //RSSのURLを入力する
$rss = $feed->loadRss( $url ) ;
$num = 5;//表示させたい件数
$i=0;
$desW = 30;//詳細の文字数を制限します。制限しないときは0にします。
if ( $desW != 0){
	$desW = ($desW*2)+2;
}
foreach( $rss->item as $item )
{	

	if($i>=$num){
	}
	else{
		$title = $item->title ;	// タイトル
		$link = $item->link ; // リンク
		$timestamp = strtotime( $item->pubDate ) ; // 更新日時
		$description = $item->description ; // 詳細
		$description = str_replace("▼続きを読む","",$description);
		//↑ 続きを読むなど、決まった文章が詳細にはいっている場合に、それを除外する
		$description = strip_tags($description);
		if ( $desW != 0){
			$description = mb_strimwidth($description, 0, $desW, "…",'utf-8');
		}
        $thumbnail = "./images/blog1.jpg";//画像がない場合の指定
        
        // if ($img === reset($matches[0])) {
        //     if( preg_match('/src=[\'"](.+?(jpe?g|png))[\'"]/i', $img, $m) ){
        //     $thumbnail = $m[1];
        //     }
        //     }


        // khong lấy hình ảnh
        // if( preg_match_all('/<img([\s\S]+?)>/is', $item->description, $matches) ){
        //     $matches = str_replace("src =","src=",$matches);
        //     foreach( $matches[0] as $img ){
        
		if( preg_match_all('/<img([\s\S]+?)>/is', $item->description, $matches) ){
			foreach( $matches[0] as $img ){
				if ($img === reset($matches[0])) {
                    if( preg_match('/src=[\'"](.+?(jpe?g|png))[\'"]/i', $img, $m) ){
                    $thumbnail = $m[1];
					}
				}
			}
		}
		?>

		<div class="recent-post clearfix">
            <a href="<?php echo $link; ?>" target="_blank">
            	<img src="<?php print $thumbnail; ?>" alt="<?php print $item->title; ?>" class="hv-o">
            </a>
            <h4><a href="<?php echo $link; ?>" target="_blank"><?php echo $title; ?></a></h4>
            <p><?php echo mb_substr($description, 0, 20,'UTF-8').'...'; ?></p>
			
        </div>
	<?php
		$i++;
	}
}
?>


		