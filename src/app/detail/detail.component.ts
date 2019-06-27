import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
    detailContent: any;

    constructor(private route: ActivatedRoute,
                private http: HttpClient) {
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.getDetail();
            }
        );
    }

    getDetail() {
        let detailCategory: any = this.route.snapshot.paramMap.keys[0];
        let currentDetail: string = this.route.snapshot.paramMap.get(detailCategory);

        if (!detailCategory) {
            detailCategory = 'about';
            currentDetail = 'philosophy';
        }

        const fileLoc = `assets/docs/detail/${detailCategory}/${currentDetail}.html`;
        const httpResponse = this.http.get(fileLoc, {responseType: 'html' as 'text'});
        httpResponse.subscribe(content => this.detailContent = content);
    }
}
