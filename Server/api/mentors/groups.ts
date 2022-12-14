const createGetResponse = () => ({
  data:{
    data: [
      {
        id: '1',
        subject: 'Giải tích 1',
        img: '/assets/groups/g1.png',
        faculty: 'Hóa',
        quantity: '3',
        status: 1,
        is_mentor: false,
        self_study: true,
        is_creator: true,
        created_at: '2022-08-05T16:04:43.967Z',
        updated_at: '2022-08-05T16:04:43.967Z',
      },
      {
        id: '2',
        subject: 'Tin học đại cương',
        img: '/assets/groups/g2.jpg',
        self_study: 'false',
        faculty: 'Công nghệ thông tin',
        quantity: '3',
        status: 0,
        is_mentor: false,
        is_creator: false,
        created_at: '2022-08-05T16:04:43.967Z',
        updated_at: '2022-08-05T16:04:43.967Z',
      },
      {
        id: '3',
        subject: 'Xác suất thống kê',
        img: '/assets/groups/g3.jpg',
        self_study: true,
        faculty: 'Cơ khí giao thông',
        quantity: '1',
        status: 2,
        is_mentor: true,
        is_creator: false,
        created_at: '2022-08-05T16:04:43.967Z',
        updated_at: '2022-08-05T16:04:43.967Z',
      },    
    ]
  }
});
  
  const createPostResponse = () => ({
    api_token: 'beareAuthApiToken',
  });
  
  const ValidationErrorResponses = () => ({
    name: [
      'Tên đăng nhập đã tồn tại',
      'Tên đăng nhập đã tồn tại',
    ],
    quantity: [
      'Tên đăng nhập đã tồn tại',
      'Tên đăng nhập đã tồn tại',
    ],
  });
  export default defineEventHandler(async (event) => {
    if (isMethod(event, 'POST')) {
      const body = await useBody(event);
      if (body.name === 'a') {
        // eslint-disable-next-line no-param-reassign
        event.res.statusCode = 422;
        return ValidationErrorResponses();
      }
      return createPostResponse();
    }
  
    return createGetResponse();
  });
  