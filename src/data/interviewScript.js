export const interviewNodes = [
  // ── メインフロー ──
  {
    id: 'opening',
    type: 'scriptNode',
    position: { x: 400, y: 50 },
    data: {
      nodeType: 'start',
      title: '冒頭挨拶・進行説明',
      text: 'はじめまして。本日一次面接を担当します、CTOのアンディです。\n音声は問題なく聞こえていますか？\n\n今日は ① 条件確認 → ② 経験・志望理由ヒアリング → ③ スクリプト読み → ④ 逆質問 の順で進めます。よろしくお願いします。',
    },
  },
  {
    id: 'conditions',
    type: 'scriptNode',
    position: { x: 400, y: 250 },
    data: {
      nodeType: 'talk',
      title: '必須条件確認（4項目）',
      text: '最初に必須条件だけ確認させてください。合う合わないが大事なので、率直に答えてもらえれば大丈夫です。\n\n① 週15時間以上の稼働は確保できそうですか？\n② 電話業務があるので、静かな環境と有線イヤホンは用意できますか？\n③ 最低2ヶ月以上継続できますか？\n④ 現在の大学・学部・学年を教えてください。',
    },
  },
  {
    id: 'self-intro',
    type: 'scriptNode',
    position: { x: 400, y: 550 },
    data: {
      nodeType: 'talk',
      title: '自己紹介（1分）',
      text: 'じゃあまず、簡単に自己紹介してもらえますか？1分以内でお願いします。\n\n【聞いたあと】\n「今の自己紹介を30秒で言うとしたら、一番大事なのってどこですか？30秒版でもう一度お願いします。」',
    },
  },
  {
    id: 'motivation',
    type: 'scriptNode',
    position: { x: 400, y: 800 },
    data: {
      nodeType: 'talk',
      title: '志望理由・得たいこと',
      text: '今回StoDのインターンに興味を持ってくれた理由を聞かせてください。他にもインターンはあると思うんですが、なんでうちを選んだんですか？\n\n→「このインターンを通じて、何を得たいと思っていますか？「なんとなく」ではなく、自分の言葉で教えてください。」',
    },
  },
  {
    id: 'company-research',
    type: 'scriptNode',
    position: { x: 400, y: 1050 },
    data: {
      nodeType: 'talk',
      title: '事前調査・サービス感想',
      text: 'うちの会社やサービスについて、事前に調べてきたことはありますか？どこが気になりましたか？\n\n→「今の話に関連して、うちのサービスを見てどう思いましたか？」\n\n※ここは「広く聞いた質問」。相手が観点確認してから答えるか、確認せず話し始めるかを見る。',
    },
  },
  {
    id: 'hard-work',
    type: 'scriptNode',
    position: { x: 400, y: 1350 },
    data: {
      nodeType: 'talk',
      title: '本気で取り組んだ経験（深掘り）',
      text: '今まで何かに本気で取り組んだことって何ですか？部活・受験・バイト・サークルなど何でも大丈夫です。\n\n→「そのとき、自分でどんな目標を立てていましたか？数字で測っていましたか？」\n→「結果はどうでしたか？達成できた/できなかった理由は自分ではどう見ていますか？」\n→「努力したけど結果が出なかった時期はありましたか？そのとき、どう立て直しましたか？」',
    },
  },
  {
    id: 'sales-mind',
    type: 'scriptNode',
    position: { x: 400, y: 1650 },
    data: {
      nodeType: 'talk',
      title: '営業への向き合い方',
      text: 'この業務はかなり断られる仕事です。極端に言うと、100件電話して99件断られる日もあります。\nそれを聞いて、率直にどう感じますか？\n\n→「もしそういう日が続いたら、自分ならどう切り替えますか？」',
    },
  },
  {
    id: 'earnings',
    type: 'scriptNode',
    position: { x: 400, y: 1900 },
    data: {
      nodeType: 'talk',
      title: '稼ぎたい金額・アポ計算',
      text: 'ちょっと直接的に聞くんですけど、このインターンでどれくらい稼ぎたいですか？\n\n→「それを達成するためには、月何件アポを取ればいいと思いますか？一緒に計算しても大丈夫です。」',
    },
  },
  {
    id: 'salary-explain',
    type: 'scriptNode',
    position: { x: 400, y: 2150 },
    data: {
      nodeType: 'objection',
      title: '給与体系の期待値調整',
      text: '【画面共有する】\nhttps://docs.google.com/spreadsheets/d/16--ick98Ekeemsx4lPiwAJMezIWjHruBMAC9csrLoSg/edit?gid=0#gid=0\n\n最初は成果報酬から始まる設計です。媒体で「時給2,000円以上」を見てくれているかもしれませんが、最初から固定ではありません。\n\n成果・稼働状況・勤務態度でランクが上がると時給制に移行。ゴールドランクで時給1,600円＋インセンティブ込みで実質時給2,000円以上を狙える形です。\n\n成果を出して報酬と裁量を上げていきたい人に合うインターンです。',
    },
  },
  {
    id: 'schedule',
    type: 'scriptNode',
    position: { x: 400, y: 2450 },
    data: {
      nodeType: 'talk',
      title: '稼働イメージ確認',
      text: '週15時間って、実際どのタイミングに入れようと思っていますか？\n今の時間割や部活、バイトの予定ってどんな感じですか？\n\n→「手帳・カレンダー・タスク管理ツールなど、自分なりに予定を管理する仕組みはありますか？」',
    },
  },
  {
    id: 'feedback-node',
    type: 'scriptNode',
    position: { x: 400, y: 2700 },
    data: {
      nodeType: 'objection',
      title: 'フィードバック＋30秒言い直し',
      text: 'ここまでいくつか話してもらったので、一つだけフィードバックさせてください。\n\nさっきの「___」の話ですが、少し伝わりにくかった部分がありました。\n▶ 選択肢：自己紹介 / 応募理由 / 本気で取り組んだ経験 / インターンで得たいこと\n\nそこだけ、もう一度30秒くらいで言い直してみてもらえますか？',
    },
  },
  {
    id: 'script-reading',
    type: 'scriptNode',
    position: { x: 400, y: 2950 },
    data: {
      nodeType: 'talk',
      title: 'スクリプト読み',
      text: '最後に、実際の業務に近い確認をします。Meetチャットにスクリプトを貼るので、冒頭を一回読んでみてください。\n\n【候補者に渡すトークスクリプト】\nお世話になっております。\n私、株式会社StoDの〇〇と申します。\n\n本日、御社のIT人材採用の件でご連絡しておりまして、\n新卒採用のご担当者様はいらっしゃいますでしょうか？\n\nお電話代わっていただき、ありがとうございます。\n私、株式会社StoDの〇〇と申します。\n\n本日は御社のIT人材採用についてご連絡させていただきました。\n今、2〜3分ほどお時間よろしいでしょうか？\n\n【読み終わったら】\n「今のは少し早く聞こえたので、もう少しゆっくり読んでみてください。あと、最初の名乗りを少し明るくお願いします。」\n→ もう一回やってもらう。',
    },
  },
  {
    id: 'future',
    type: 'scriptNode',
    position: { x: 400, y: 3200 },
    data: {
      nodeType: 'talk',
      title: '将来のこと（時間があれば）',
      text: '最後に、少し将来のことも聞かせてください。10年後、何してたいですか？なんでもいいです、正直に。\n\n→ 起業が出た：「なんで起業したいんですか？いつ頃そう思うようになったんですか？」\n→ 出なかった：「起業とか、自分でビジネスをやることって考えたことありますか？」',
    },
  },
  {
    id: 'reverse-qa',
    type: 'scriptNode',
    position: { x: 400, y: 3450 },
    data: {
      nodeType: 'talk',
      title: '逆質問',
      text: 'こちらから聞きたいことは以上です。最後に、StoD・業務内容・働き方・選考フローなどで、聞いておきたいことはありますか？\n\n分からないことを聞かれた場合：\n「その点は正確に確認してからお伝えします。今ここで曖昧に答えるより、正式な内容で案内したいです。」',
    },
  },
  {
    id: 'closing',
    type: 'scriptNode',
    position: { x: 400, y: 3700 },
    data: {
      nodeType: 'end',
      title: '締め',
      text: '本日はありがとうございました。今日の内容を社内で確認したうえで、結果は追ってご連絡します。\n通過となった場合は、次の案内をお送りします。本日はお時間いただきありがとうございました。',
    },
  },

  // ── 分岐ノード ──
  {
    id: 'conditions-ng',
    type: 'scriptNode',
    position: { x: 50, y: 400 },
    data: {
      nodeType: 'objection',
      title: '条件NG',
      text: 'ありがとうございます。今回のインターンは、今確認した条件が必須になっています。\n\n現時点だと条件面で合わない可能性があるので、本日はここまで確認させていただき、社内で確認したうえで結果をご連絡します。',
    },
  },
  {
    id: 'closing-early',
    type: 'scriptNode',
    position: { x: 50, y: 600 },
    data: {
      nodeType: 'end',
      title: '早期終了（条件NG）',
      text: '本日はお時間いただきありがとうございました。',
    },
  },
  {
    id: 'self-intro-long',
    type: 'scriptNode',
    position: { x: 800, y: 550 },
    data: {
      nodeType: 'objection',
      title: '自己紹介が長かった',
      text: 'ありがとうございます。一度ここで区切らせてください。\n今の内容を30秒で言うなら、一番大事なのはどこですか？',
    },
  },
  {
    id: 'service-no-confirm',
    type: 'scriptNode',
    position: { x: 800, y: 1050 },
    data: {
      nodeType: 'objection',
      title: '観点確認せずに話した場合',
      text: 'ありがとうございます。今の質問はあえて少し広く聞きました。\n\n営業では、相手の質問が曖昧なこともあります。「何についてですか？」や「○○という観点でいいですか？」と確認できるかも大事なんです。\n\nでは改めて、学生インターンとして見たときの魅力という観点で答えてください。',
    },
  },
  {
    id: 'salary-ng',
    type: 'scriptNode',
    position: { x: 800, y: 2150 },
    data: {
      nodeType: 'objection',
      title: '給与体系への反応が微妙',
      text: 'ここは入ってからギャップになるとよくないので、先に正直に伝えています。\nこの給与体系について、率直にどう感じますか？',
    },
  },
  {
    id: 'schedule-vague',
    type: 'scriptNode',
    position: { x: 800, y: 2450 },
    data: {
      nodeType: 'objection',
      title: '稼働イメージが曖昧',
      text: 'たとえば月曜の何時から何時、みたいに具体的に決めるとしたらどうなりそうですか？',
    },
  },
];

export const interviewEdges = [
  { id: 'ie1', source: 'opening', target: 'conditions', label: '次へ' },
  { id: 'ie2', source: 'conditions', target: 'self-intro', label: '条件OK' },
  { id: 'ie3', source: 'conditions', target: 'conditions-ng', label: '条件NG' },
  { id: 'ie4', source: 'conditions-ng', target: 'closing-early', label: '早期終了へ' },
  { id: 'ie5', source: 'self-intro', target: 'motivation', label: '1分以内でOK' },
  { id: 'ie6', source: 'self-intro', target: 'self-intro-long', label: '長かった' },
  { id: 'ie7', source: 'self-intro-long', target: 'motivation', label: '30秒版聞けた' },
  { id: 'ie8', source: 'motivation', target: 'company-research', label: '次へ' },
  { id: 'ie9', source: 'company-research', target: 'hard-work', label: '観点確認してから答えた' },
  { id: 'ie10', source: 'company-research', target: 'service-no-confirm', label: '確認せず話した' },
  { id: 'ie11', source: 'service-no-confirm', target: 'hard-work', label: 'フィードバック後' },
  { id: 'ie12', source: 'hard-work', target: 'sales-mind', label: '次へ' },
  { id: 'ie13', source: 'sales-mind', target: 'earnings', label: '次へ' },
  { id: 'ie14', source: 'earnings', target: 'salary-explain', label: '次へ' },
  { id: 'ie15', source: 'salary-explain', target: 'schedule', label: '反応OK' },
  { id: 'ie16', source: 'salary-explain', target: 'salary-ng', label: '反応が微妙' },
  { id: 'ie17', source: 'salary-ng', target: 'schedule', label: '確認できた' },
  { id: 'ie18', source: 'schedule', target: 'feedback-node', label: '具体的に答えた' },
  { id: 'ie19', source: 'schedule', target: 'schedule-vague', label: '曖昧だった' },
  { id: 'ie20', source: 'schedule-vague', target: 'feedback-node', label: '具体化できた' },
  { id: 'ie21', source: 'feedback-node', target: 'script-reading', label: '次へ' },
  { id: 'ie22', source: 'script-reading', target: 'future', label: '次へ' },
  { id: 'ie23', source: 'future', target: 'reverse-qa', label: '次へ' },
  { id: 'ie24', source: 'reverse-qa', target: 'closing', label: '次へ' },
];
