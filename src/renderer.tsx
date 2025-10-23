import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || '구미디지털적층산업사업협동조합'}</title>
        <meta name="description" content="3D 프린팅 및 적층제조 기술을 중심으로 회원사의 상생과 지역 산업 혁신을 위해 설립된 협동조합" />
        <meta name="keywords" content="3D프린팅, 적층제조, 구미, 협동조합, 디지털제조" />
        
        {/* TailwindCSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* FontAwesome */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom CSS */}
        <link href="/static/css/styles.css" rel="stylesheet" />
        
        {/* Tailwind Config */}
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'navy': '#1B3A7D',
                  'purple': '#7B3FF2',
                  'teal': '#00A9CE',
                  'coral': '#FF6B6B'
                }
              }
            }
          }
        `}} />
      </head>
      <body class="font-sans antialiased">{children}</body>
    </html>
  )
})
