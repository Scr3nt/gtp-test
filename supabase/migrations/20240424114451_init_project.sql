create table "public"."admin_user" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "email" text,
    "is_admin" boolean
);


alter table "public"."admin_user" enable row level security;

create table "public"."employee" (
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "admin_id" uuid,
    "id" uuid not null default gen_random_uuid(),
    "email" text
);


alter table "public"."employee" enable row level security;

create table "public"."tasks" (
    "created_at" timestamp with time zone not null default now(),
    "start_hour" text,
    "end_hour" text,
    "admin_id" uuid,
    "id" uuid not null default gen_random_uuid(),
    "employee_id" uuid,
    "date" text,
    "title" text
);


alter table "public"."tasks" enable row level security;

CREATE UNIQUE INDEX admin_user_pkey ON public.admin_user USING btree (id);

CREATE UNIQUE INDEX employee_pkey ON public.employee USING btree (id);

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

alter table "public"."admin_user" add constraint "admin_user_pkey" PRIMARY KEY using index "admin_user_pkey";

alter table "public"."employee" add constraint "employee_pkey" PRIMARY KEY using index "employee_pkey";

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."employee" add constraint "employee_admin_id_fkey" FOREIGN KEY (admin_id) REFERENCES admin_user(id) ON DELETE CASCADE not valid;

alter table "public"."employee" validate constraint "employee_admin_id_fkey";

alter table "public"."tasks" add constraint "tasks_admin_id_fkey" FOREIGN KEY (admin_id) REFERENCES admin_user(id) ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_admin_id_fkey";

alter table "public"."tasks" add constraint "tasks_employee_id_fkey" FOREIGN KEY (employee_id) REFERENCES employee(id) not valid;

alter table "public"."tasks" validate constraint "tasks_employee_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_employee_admin_id(user_id uuid)
 RETURNS uuid
 LANGUAGE sql
 STABLE SECURITY DEFINER
AS $function$
  SELECT admin_id
  FROM employee
  WHERE id = $1;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$

begin
IF (NEW.raw_user_meta_data ->> 'is_admin')::boolean IS NOT NULL THEN
  insert into public.admin_user (id, email, is_admin)
  values (new.id, new.email, (NEW.raw_user_meta_data ->> 'is_admin')::boolean);
  ELSE
    INSERT INTO public.employee (id, email, name, admin_id)
    VALUES (
      NEW.id,
      NEW.email,
      (NEW.raw_user_meta_data ->> 'name'),
      (NEW.raw_user_meta_data ->> 'admin_id')::uuid
    );
  END IF;
  return new;
end;
$function$
;

grant delete on table "public"."admin_user" to "anon";

grant insert on table "public"."admin_user" to "anon";

grant references on table "public"."admin_user" to "anon";

grant select on table "public"."admin_user" to "anon";

grant trigger on table "public"."admin_user" to "anon";

grant truncate on table "public"."admin_user" to "anon";

grant update on table "public"."admin_user" to "anon";

grant delete on table "public"."admin_user" to "authenticated";

grant insert on table "public"."admin_user" to "authenticated";

grant references on table "public"."admin_user" to "authenticated";

grant select on table "public"."admin_user" to "authenticated";

grant trigger on table "public"."admin_user" to "authenticated";

grant truncate on table "public"."admin_user" to "authenticated";

grant update on table "public"."admin_user" to "authenticated";

grant delete on table "public"."admin_user" to "service_role";

grant insert on table "public"."admin_user" to "service_role";

grant references on table "public"."admin_user" to "service_role";

grant select on table "public"."admin_user" to "service_role";

grant trigger on table "public"."admin_user" to "service_role";

grant truncate on table "public"."admin_user" to "service_role";

grant update on table "public"."admin_user" to "service_role";

grant delete on table "public"."employee" to "anon";

grant insert on table "public"."employee" to "anon";

grant references on table "public"."employee" to "anon";

grant select on table "public"."employee" to "anon";

grant trigger on table "public"."employee" to "anon";

grant truncate on table "public"."employee" to "anon";

grant update on table "public"."employee" to "anon";

grant delete on table "public"."employee" to "authenticated";

grant insert on table "public"."employee" to "authenticated";

grant references on table "public"."employee" to "authenticated";

grant select on table "public"."employee" to "authenticated";

grant trigger on table "public"."employee" to "authenticated";

grant truncate on table "public"."employee" to "authenticated";

grant update on table "public"."employee" to "authenticated";

grant delete on table "public"."employee" to "service_role";

grant insert on table "public"."employee" to "service_role";

grant references on table "public"."employee" to "service_role";

grant select on table "public"."employee" to "service_role";

grant trigger on table "public"."employee" to "service_role";

grant truncate on table "public"."employee" to "service_role";

grant update on table "public"."employee" to "service_role";

grant delete on table "public"."tasks" to "anon";

grant insert on table "public"."tasks" to "anon";

grant references on table "public"."tasks" to "anon";

grant select on table "public"."tasks" to "anon";

grant trigger on table "public"."tasks" to "anon";

grant truncate on table "public"."tasks" to "anon";

grant update on table "public"."tasks" to "anon";

grant delete on table "public"."tasks" to "authenticated";

grant insert on table "public"."tasks" to "authenticated";

grant references on table "public"."tasks" to "authenticated";

grant select on table "public"."tasks" to "authenticated";

grant trigger on table "public"."tasks" to "authenticated";

grant truncate on table "public"."tasks" to "authenticated";

grant update on table "public"."tasks" to "authenticated";

grant delete on table "public"."tasks" to "service_role";

grant insert on table "public"."tasks" to "service_role";

grant references on table "public"."tasks" to "service_role";

grant select on table "public"."tasks" to "service_role";

grant trigger on table "public"."tasks" to "service_role";

grant truncate on table "public"."tasks" to "service_role";

grant update on table "public"."tasks" to "service_role";

create policy "Let admin to do all actions"
on "public"."admin_user"
as permissive
for all
to public
using ((auth.uid() = id));


create policy "Let admin to do all actions"
on "public"."employee"
as permissive
for all
to public
using ((auth.uid() = admin_id));


create policy "Let employee to select"
on "public"."employee"
as permissive
for select
to public
using ((admin_id IN ( SELECT get_employee_admin_id(auth.uid()) AS get_employee_admin_id)));


create policy "Let admin to do all actions"
on "public"."tasks"
as permissive
for all
to public
using ((auth.uid() = admin_id));


create policy "Let employee to see tasks"
on "public"."tasks"
as permissive
for select
to public
using ((admin_id = ( SELECT employee.admin_id
   FROM employee
  WHERE (employee.id = auth.uid()))));