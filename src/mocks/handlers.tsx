import { rest } from 'msw';
import { QUERY_URL } from './../constants';
import jsonResponse from './data.json';

export const handlers = [
  /*
  rest.get(QUERY_PATH, (req, res, ctx) => {

    console.log("searchPArams"+req.url.searchParams);
    return res(
      ctx.status(200),
      ctx.json({
        data: jsonResponse
      })
    );
  }),*/

  rest.get("https://movies-mock-api-s7oiqxtmzq-lz.a.run.app/api/movies", (req, res, ctx) => {
    const qParam = req.url.searchParams.get('q');
    let response = null;

    if(qParam === 'w')
      response = jsonResponse;
    
    return res(
        ctx.json(response)
    );
}),
];