import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Fact } from '@models/fact.model';
import { GifResponse } from '@models/gifresponse.model';
import { HistoryItem } from '@models/history.model';
import { PagedResult } from '@models/pagedresult.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GifService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * @method getFact
   * @description Obtiene un dato aleatorio sobre gatos.
   * @returns Un Observable que emite el dato sobre gatos junto con su longitud en carácteres.
   */
  getFact(): Observable<Fact> {
      return this.http.get<Fact>(
        `${this.apiUrl}fact`,
      );
  }

  /**
   * @method getGif
   * @param query - String de la query para obtener el gif.
   * @description En base a una cadena de carácteres, se obtiene el link de un gif.
   * @returns Un Observable que emite el link de un gif.
   */
  getGif(query: string, catFact: Fact): Observable<GifResponse> {
    const encodedQuery = encodeURIComponent(query);
    const encodedFullFact = encodeURIComponent(catFact.fact);

    return this.http.get<GifResponse>(
      `${this.apiUrl}gif?query=${encodedQuery}&fullFact=${encodedFullFact}&length=${catFact.length}`
    );
  }

  getHistory(page: number, limit: number): Observable<PagedResult<HistoryItem>> {
    return this.http.get<any>(
      `${this.apiUrl}history?page=${page}&limit=${limit}`
    );
  }

}
