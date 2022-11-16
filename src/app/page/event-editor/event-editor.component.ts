import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event$: Observable<Event> = this.ar.params.pipe(
    switchMap(params => this.eventService.get(params['id'])),
  );

  event: Event = new Event;

  constructor(
    private eventService: EventService,
    private ar: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.event$.subscribe(event => this.event = event)
  }

  onUpdate(form: NgForm): void {
    const event = form.value;
    event.id = this.event.id;
    this.eventService.update(event).subscribe(
      event => this.router.navigate(['/event'])
    )
  }

}
